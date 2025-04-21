'use server'

import { createWorkspace } from "@/http/create-workspace"
import { HTTPError } from "ky"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const createWorkspaceSchema = z.object({
  name: z.string().min(2, "Nome do workspace deve ter pelo menos 2 caracteres."),
})

export async function createWorkspaceAction(data: FormData) {
  const result = createWorkspaceSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name } = result.data

  try {
    await createWorkspace({
      name,
    })

    revalidateTag('workspaces')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Unexpected error try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the workspace.',
    errors: null,
  }
}