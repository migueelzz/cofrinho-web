import { api } from "@/lib/axios"

type AuthenticateParams = {
  email: string
  password: string
}

type AuthenticateResponse = {
  token: string
}

export async function authenticate({ email, password }: AuthenticateParams): Promise<AuthenticateResponse> {
  const response = await api.post('/sessions/password', {
    email,
    password,
  })

  return response.data
}