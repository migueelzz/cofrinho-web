'use client'

import { createWorkspace } from "@/http/create-workspace"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2, Plus } from "lucide-react"

const createWorkspaceSchema = z.object({
  name: z.string().min(2, "Nome do workspace deve ter pelo menos 2 caracteres."),
})

type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>

export function CreateWorkspaceForm() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: createWorkspaceFn, isPending } = useMutation({
    mutationFn: createWorkspace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
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

    router.push(`/workspace/${workspace.slug}`)
  }

  return (
    <div className='w-full space-y-4'>
      <div className='space-y-0 text-center'>
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
          disabled={isPending}
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className='size-4' />}
          Criar novo workspace
        </Button>
      </form>
    </div>
  )
}