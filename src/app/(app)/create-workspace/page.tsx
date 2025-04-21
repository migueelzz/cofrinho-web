import { CreateWorkspaceForm } from "@/app/(app)/create-workspace/create-workspace-form";
import { Logo } from "@/components/logo";

export default function CreateWorkspace() {
  return (
    <div className="relative flex items-center w-full min-h-screen justify-center px-4">
      <header className="fixed top-0 left-0 p-4">
        <Logo />
      </header>

      <div className='max-w-md w-full space-y-4'>
        <div className='space-y-0 text-center'>
          <h2 className="text-xl font-semibold">Criar seu workspace</h2>
          <p className='text-sm text-muted-foreground'>
            Crie seu espaço para gerenciar e controlar suas finanças.
          </p>
        </div>

        <CreateWorkspaceForm />
  
      </div>
    </div>
  )
}