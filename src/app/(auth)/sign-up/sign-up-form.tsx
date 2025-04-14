'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AtSign, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const signUpSchema = z.object({
  name: z.string().min(2, "Nome muito curto."),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpFormData) => {
    console.log("Formulário enviado:", data)
    // lógica para criar conta aqui
  }

  const handleGoogleSignIn = () => {
    console.log("Login com Google")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-4">
      <Button
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
      </div>

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