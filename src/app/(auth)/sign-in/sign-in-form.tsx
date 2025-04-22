'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useFormState } from "@/hooks/use-form-state"
import { signInWithEmailAndPassword } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export function SignInForm({ currentWorkspace }: { currentWorkspace: string | null }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      if (currentWorkspace) {
        router.push(`/workspace/${currentWorkspace}`)
      }
      router.push('/')
    }
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-4">
        {success === false && message && (
          <Alert variant="destructive" className="bg-red-100 border-0">
            <AlertTriangle className="size-4" />

            <AlertTitle>Falha ao fazer login!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

      <div className="flex flex-col gap-1">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {isPending ? "Entrando..." : "Continuar"}
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        asChild
      >
        <Link href='/sign-up'>
          Criar uma nova conta
        </Link>
      </Button>
    </form>
  )
}
