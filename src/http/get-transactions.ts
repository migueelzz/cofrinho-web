import { api } from "@/lib/axios"

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

export async function getTransactions({ slug }: GetTransactionsQuery): Promise<GetTransactionsResponse> {
  const response = await api.get(`/workspaces/${slug}/transactions`)

  return response.data
}