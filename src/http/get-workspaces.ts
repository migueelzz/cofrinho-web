import { api } from "@/lib/axios"

type GetWorkspacesResponse = {
  workspaces: {
    id: string
    name: string
    slug: string
    avatarUrl: string
    createdAt: string
    ownerId: string
    members: {
      userId: string
      role: string
    }[]
  }[]
}

export async function getWorkspaces(): Promise<GetWorkspacesResponse> {
  const response = await api.get('/workspaces')

  return response.data
}