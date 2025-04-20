'use server'

import { cookies } from 'next/headers'

export async function getCurrentWorkspace() {
  const cookieStore = await cookies()
  const currentWorkspace = cookieStore.get('workspace')?.value ?? null
  return currentWorkspace
}