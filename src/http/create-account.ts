import { api } from "@/lib/axios"

type CreateAccountBody = {
  name: string
  email: string
  password: string
}

type CreateAccountResponse = {
  userId: string
}

export async function createAccount({ name, email, password }: CreateAccountBody): Promise<CreateAccountResponse> {
  const response = await api.post<CreateAccountResponse>("/users", {
    name, 
    email, 
    password
  })

  return response.data
}