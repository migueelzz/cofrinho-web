import { api } from "./api-client"

type GetProfileResponse = {
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string
    lastLoginAt: string
  }
}

export async function getProfile() {
  const response = await api.get('profile').json<GetProfileResponse>()

  return response
}