'use server'

import { getToken } from "@/lib/auth"
import { api } from "@/lib/axios"

type GetWorkspacesResponse = {
  workspaces: {
    id: string
    name: string
    slug: string
    avatarUrl: string
    createdAt: string
    ownerId: string
  }[]
}

export async function getWorkspaces(): Promise<GetWorkspacesResponse> {
  const token = await getToken()
  
  const response = await api.get('/workspaces', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}