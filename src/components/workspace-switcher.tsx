'use client'

import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { getWorkspaces } from '@/http/get-workspaces'
import { useWorkspace } from '@/context/workspace-context'

export function WorkspaceSwitcher() {
  const { data, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspaces,
  })

  const { currentWorkspace, setCurrentWorkspace } = useWorkspace()

  const currentWork = data ? data.workspaces.find(
    (workspace) => workspace.slug === currentWorkspace?.slug,
  ) : null

  const handleSelect = (workspace: any) => {
    setCurrentWorkspace(workspace)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentWork ? (
          <>
            <Avatar className="size-4">
              {currentWork.avatarUrl && (
                <AvatarImage src={currentWork.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">
              {currentWork.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground whitespace-nowrap">Selecionar workspace</span>
        )}

        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          {data && data.workspaces.map((workspace) => {
            return (
              <DropdownMenuItem 
                key={workspace.id} 
                onClick={() => handleSelect(workspace)}
                asChild
              >
                <Link href={`/workspace/${workspace.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {workspace.avatarUrl && (
                      <AvatarImage src={workspace.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{workspace.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/">
            <PlusCircle className="mr-2 size-4" />
            Adicionar workspace
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}