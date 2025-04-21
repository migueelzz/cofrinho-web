'use server'

import { authenticate } from '@/http/authenticate'
import { createAccount } from '@/http/create-account'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

const signInSchema = z.object({
  name: z.string().min(2, "Nome muito curto."),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
})

export async function signUpAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = result.data

  try {
    await createAccount({ 
      name, 
      email, 
      password,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)
    return {
      success: false,
      message: 'Unexpected error try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}