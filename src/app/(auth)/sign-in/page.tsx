import { PiggyBank } from "lucide-react";
import { SignInForm } from "./sign-in-form";
import Link from "next/link";
import { getCurrentWorkspace } from "@/utils/get-current-workspace";

export default async function SignIn() {
  const currentWorkspace = await getCurrentWorkspace()

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center size-12 bg-background rounded-xl shadow-sm">
        <PiggyBank className="size-8 -rotate-12 text-zinc-700 dark:text-zinc-300" />
      </div>

      <h1 className="text-2xl font-semibold">Acessar sua conta</h1>
      <span className="text-sm text-muted-foreground text-center">
        Faça login para acessar o Cofrinho
      </span>

      <SignInForm currentWorkspace={currentWorkspace} />

      <p className="mt-6 text-sm text-center text-muted-foreground">
        Ao clicar em continuar, você concorda com nossos{' '}
        <Link href="" className="underline">
          Termos de Serviço
        </Link>{' '}
        e{' '}
        <Link href="" className="underline">
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  )
}
