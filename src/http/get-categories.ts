import { api } from "./api-client"

type GetCategoriesResponse = {
  categories: {
    id: string
    emoji: string
    name: string
  }[]
}

export async function getCategories() {
  const response = await api.get(`categories`).json<GetCategoriesResponse>()

  return response
}