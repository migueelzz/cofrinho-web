import { api } from "./api-client"

type GetTransactionsQuery = {
  slug: string
  startDate?: string | undefined
  endDate?: string | undefined
  page?: number | undefined
  size?: number | undefined
  order?: 'asc' | 'desc'
}

export type GetTransactionsResponse = {
  items: {
    id: string
    amount: number
    type: "EXPENSE" | "INCOME"
    date: string
    description: string
    category: {
      id: string
      emoji: string
      name: string
    }
    isRecurring: boolean
    notifyUser: boolean
  }[]
  meta: {
    page: number
    size: number
    total: number
    pages: number
    order: 'asc' | 'desc'
  }
}

export async function getTransactions({ slug, page, size, startDate, endDate, order }: GetTransactionsQuery) {
  const searchParams = Object.entries({ page, size, startDate, endDate, order })
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => [key, String(value)]);

  const response = await api.get(`workspaces/${slug}/transactions`, {
    searchParams,
    // next: {
    //   tags: [`${slug}/transactions`],
    // },
  }).json<GetTransactionsResponse>()

  return response
}