import { api } from "@/lib/axios"

type GetCategoriesResponse = {
  categories: {
    id: string
    emoji: string
    name: string
  }[]
}

export async function getCategories(): Promise<GetCategoriesResponse> {
  const response = await api.get(`/categories`)

  return response.data
}