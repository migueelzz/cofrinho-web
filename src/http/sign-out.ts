import { api } from "./api-client"

type SignOutResponse = {
  message: string
}

export async function signOut() {
  const response = await api.post("sessions/sign-out").json<SignOutResponse>()

  return response
}