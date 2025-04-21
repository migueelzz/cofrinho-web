
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { WorkspacesList } from '@/components/workspaces-list'
import { getWorkspaces } from '@/http/get-workspaces'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { workspaces } = await getWorkspaces()

  if (workspaces.length === 0) {
    redirect('/create-workspace')
  }

  return (
    <div className="flex items-center min-h-screen w-full justify-center px-4">
      <header className="fixed top-0 left-0 p-4">
        <Logo />
      </header>
      <div className="max-w-md w-full space-y-6">
        <WorkspacesList workspaces={workspaces} />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-50 px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <Button className='w-full' asChild>
          <Link href="/create-workspace">
            <Plus className="size-4" />
            Criar novo workspace
          </Link>
        </Button>
      </div>
    </div>
  )
}
