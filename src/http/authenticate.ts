import { api } from "./api-client"

type AuthenticateParams = {
  email: string
  password: string
}

type AuthenticateResponse = {
  token: string
}

export async function authenticate({ email, password }: AuthenticateParams) {
  const response = await api.post('sessions/password', {
    json: {
      email,
      password,
    }
  })
  .json<AuthenticateResponse>()

  return response
}