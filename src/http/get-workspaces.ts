import { api } from "./api-client"

export type GetWorkspacesResponse = {
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

export async function getWorkspaces() {
  const response = await api.get('workspaces', {
    next: {
      tags: [`workspaces`],
    },
  })
  .json<GetWorkspacesResponse>()
  
  return response
}