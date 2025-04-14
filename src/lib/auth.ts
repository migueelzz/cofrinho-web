import { cookies } from "next/headers"

export async function getToken(): Promise<string> {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    throw new Error("Token não encontrado.")
  }

  return token
}