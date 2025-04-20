
import { Logo } from '@/components/logo'
import { CreateWorkspaceForm } from '@/components/create-workspace-form'
import { WorkspacesList } from '@/components/workspaces-list'

export default async function Home() {
  return (
    <div className="flex items-center min-h-screen w-full justify-center px-4">
      <header className="fixed top-0 left-0 p-4">
        <Logo />
      </header>
      <div className="max-w-md w-full space-y-6">

        <WorkspacesList />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-50 px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <CreateWorkspaceForm />
      </div>
    </div>
  )
}
