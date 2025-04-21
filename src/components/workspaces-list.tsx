import { GetWorkspacesResponse } from "@/http/get-workspaces"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"

type WorkspacesListProps = {
  workspaces: GetWorkspacesResponse["workspaces"] | undefined
}

export async function WorkspacesList({ workspaces }: WorkspacesListProps) {
  
  if (!workspaces) {
    return <Skeleton className="w-full h-12" />
  }

  return (
    <div className="space-y-4">
      <div className='space-y-0 text-center mb-4'>
        <h2 className="text-xl font-semibold">Selecionar workspace</h2>
        <p className='text-sm text-muted-foreground'>
          Você pode alterar o workspace a qualquer momento.
        </p>
      </div>

      <ul className="space-y-1">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            href={`/workspace/${workspace.slug}`}
            className="flex items-center gap-2 rounded-lg p-3 hover:bg-muted transition cursor-pointer"
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
          </Link>
        ))}
      </ul>
    </div>
  )
}