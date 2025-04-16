import { api } from "@/lib/axios"

type GetProfileResponse = {
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string
    lastLoginAt: string
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get('/profile')

  return response.data
}