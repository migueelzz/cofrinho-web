'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AtSign, Eye, EyeOff, X } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createAccount } from "@/http/create-account"
import { toast } from "sonner"

const signUpSchema = z.object({
  name: z.string().min(2, "Nome muito curto."),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const router = useRouter()
  
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: createAccountFn, isPending } = useMutation({
    mutationFn: createAccount,
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setErrorMessage("")
  
      await createAccountFn({ name: data.name, email: data.email, password: data.password })
  
      toast.success("Cadastro realizado com sucesso!")
  
      router.push('/sign-in')
    } catch (error: any) {
      console.error(error)
  
      // Verifica a mensagem de erro retornada pela API
      if (error.response?.data?.message === "User with same email already exists.") {
        setErrorMessage("Já existe um usuário com este e-mail.")
      } else {
        setErrorMessage("Erro ao tentar cadastrar. Tente novamente.")
      }
  
      toast.error(errorMessage)
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Login com Google")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-4">
      {errorMessage && (
        <div className="flex items-center justify-between w-full text-sm bg-rose-50 dark:bg-rose-900/20 rounded-md p-3 text-rose-500">
          <span>
            {errorMessage}
          </span>

          <button type="button" className="cursor-pointer" onClick={() => setErrorMessage("")}>     
            <X className="size-4 text-rose-500" />
          </button>
        </div>
      )}

      {/* <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
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
        <Input placeholder="Nome" {...register("name")} />
        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <Input type="email" placeholder="Email" {...register("email")} />
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Criando conta..." : "Continuar"}
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        asChild
      >
        <Link href="/sign-in">Acessar uma conta existente</Link>
      </Button>
    </form>
  )
}