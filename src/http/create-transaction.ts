import { api } from "./api-client"

type CreateTransactionBody = {
  workspaceSlug: string
  amount: number
  description: string
  type: "INCOME" | "EXPENSE" | "INVESTMENT" | "SAVING"
  date: string
  categoryId: string
  isRecurring: boolean
  recurrence?: {
    frequency: string
    interval: number
    nextOccurrence: string
  }
  notifyUser: boolean
}

type CreateTransactionResponse = {
  id: string
  workspaceId: string
  userId: string
  amount: number
  description: string
  type: "INCOME" | "EXPENSE"
  date: string
  categoryId: string
  isRecurring: boolean
  recurrenceId: string | null
  notifyUser: boolean
}

export async function createTransaction({
  workspaceSlug,
  amount,
  description,
  type,
  date,
  categoryId,
  isRecurring,
  recurrence,
  notifyUser,
}: CreateTransactionBody) {
  const response = await api.post(`workspaces/${workspaceSlug}/transactions`, {
    json: {
      amount,
      description,
      type,
      date,
      categoryId,
      isRecurring,
      recurrence,
      notifyUser,
    }
  }).json<CreateTransactionResponse>()

  return response
}