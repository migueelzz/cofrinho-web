import { api } from "./api-client"

export type Workspace = {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

type CreateWorkspaceBody = {
  name: string
}

type CreateWorkspaceResponse = {
  workspace: Workspace
}

export async function createWorkspace({ name }: CreateWorkspaceBody) {
  const response = await api.post<CreateWorkspaceResponse>("workspaces", {
    json: {
      name
    }
   }).json<CreateWorkspaceResponse>()

  return response
}