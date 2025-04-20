import { api } from "./api-client"

type GetTransactionsQuery = {
  slug: string
}

type GetTransactionsResponse = {
  transactions: {
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
}

export async function getTransactions({ slug }: GetTransactionsQuery) {
  const response = await api.get(`workspaces/${slug}/transactions`, {
    next: {
      tags: [`${slug}/transactions`],
    },
  }).json<GetTransactionsResponse>()

  return response
}