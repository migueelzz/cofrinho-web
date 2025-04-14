'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AtSign, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { authenticate } from "@/http/authenticate"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const signInSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignInForm() {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const { mutateAsync: authenticateFn, isPending } = useMutation({
    mutationFn: authenticate,
    onSuccess: (data) => {
      // console.log("Token recebido:", data.token)
    },
    onError: (error) => {
      setErrorMessage("Credenciais inválidas. Tente novamente.")
      console.error("Erro ao autenticar:", error)
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      setErrorMessage("")

      await authenticateFn({ email: data.email, password: data.password })

      toast.success("Login realizado com sucesso!")

      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error("Erro ao fazer login. Tente novamente.")
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Login com Google")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-4">
      {/* <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        <AtSign className="size-4" />
        Continuar com Google
      </Button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-50 px-2 text-muted-foreground">ou</span>
        </div>
      </div> */}

      <div className="flex flex-col gap-1">
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1 relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          {...register("password")}
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
        {errors.password && (
          <span className="text-xs text-red-500">{errors.password.message}</span>
        )}
      </div>

      {errorMessage && <span className="text-sm text-red-500">{errorMessage}</span>}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Entrando..." : "Continuar"}
      </Button>

      {/* <Button
        type="button"
        variant="secondary"
        className="w-full"
        asChild
      >
        <Link href='/sign-up'>
          Criar uma nova conta
        </Link>
      </Button> */}
    </form>
  )
}
