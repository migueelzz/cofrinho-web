'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getWorkspaces } from '@/http/get-workspaces'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useWorkspace } from '@/context/workspace-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { createWorkspace } from '@/http/create-workspace'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'

const createWorkspaceSchema = z.object({
  name: z.string().min(2, "Nome do workspace deve ter pelo menos 2 caracteres."),
})

type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>

export default function SelectWorkspace() {
  const router = useRouter()
  
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace()

  const { mutateAsync: createWorkspaceFn, isPending } = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspaces,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceFormData>({
    resolver: zodResolver(createWorkspaceSchema),
  })

  async function handleCreateWorkspace(data: CreateWorkspaceFormData) {
    const { workspace } = await createWorkspaceFn({ name: data.name })

    setCurrentWorkspace(workspace)

    router.push(`/workspace/${workspace.slug}`)
  }

  if (isLoading) {
    return <div className="p-8 text-center">Carregando workspaces...</div>
  }

  if (!data?.workspaces.length) {
    return (
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white dark:bg-zinc-900">
          <div className='space-y-0 text-center mb-4'>
            <h2 className="text-xl font-semibold">Criar seu workspace</h2>
            <p className='text-sm text-muted-foreground'>
              Crie seu espaço para gerenciar e controlar suas finanças.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleCreateWorkspace)} className='space-y-4'>
            <div className='space-y-1'>
              <Input placeholder='Digite o nome do workspace' {...register('name')} />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>

            <Button
              type='submit'
              className="w-full"
            >
              <Plus className='size-4' />
              Criar novo workspace
            </Button>
          </form>
        </div>
      </div>
    )
  }

  const handleSelect = (workspace: any) => {
    setCurrentWorkspace(workspace)
    router.push(`/workspace/${workspace.slug}`)
  }

  return (
    <div className="max-w-md w-full space-y-6">
      <div className="bg-white dark:bg-zinc-900">
        <div className='space-y-0 text-center mb-4'>
          <h2 className="text-xl font-semibold">Selecionar workspace</h2>
          <p className='text-sm text-muted-foreground'>
            Você pode alterar o workspace a qualquer momento.
          </p>
        </div>

        <ul className="space-y-1">
          {data.workspaces.map((workspace) => (
            <li 
              key={workspace.id} 
              className="flex items-center gap-2 rounded-lg p-3 hover:bg-muted transition cursor-pointer"
              onClick={() => handleSelect(workspace)}
            >
              <Avatar>
                {workspace.avatarUrl && (
                  <AvatarImage src={workspace.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>
              <div>
                <p className="font-medium">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  {workspace.members.length} {workspace.members.length > 1 ? 'membros' : 'membro'}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-50 px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleCreateWorkspace)} className='space-y-4'>
          <div className='space-y-1'>
            <Input placeholder='Digite o nome do workspace' {...register('name')} />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <Button
            type='submit'
            className="w-full"
          >
            <Plus className='size-4' />
            Criar novo workspace
          </Button>
        </form>
      </div>
    </div>
  )
}
