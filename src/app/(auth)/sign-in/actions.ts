'use server'

import { authenticate } from '@/http/authenticate'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await authenticate({ email, password })

    const cookieStore = await cookies()
    cookieStore.set('token', token, { path: '/' })

    // Redireciona para a página inicial ou workspace
    const inviteId = cookieStore.get('inviteId')?.value

    if (inviteId) {
      try {
        // await acceptInvite(inviteId)
        cookieStore.delete('inviteId')
      } catch {}
    }
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