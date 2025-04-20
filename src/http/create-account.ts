import { api } from "./api-client"

type CreateAccountBody = {
  name: string
  email: string
  password: string
}

type CreateAccountResponse = {
  userId: string
}

export async function createAccount({ name, email, password }: CreateAccountBody) {
  const response = await api.post("users", {
    json: {
      name, 
      email, 
      password
    }
  }).json<CreateAccountResponse>()

  return response
}