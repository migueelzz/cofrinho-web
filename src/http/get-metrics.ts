import { api } from "@/lib/axios"

type GetMetricsParams = {
  slug: string
}

export interface Expense {
  total: number
  percentage: number
}

export interface Investment {
  total: number
  percentage: number
}

export interface Saving {
  total: number
  percentage: number
}

export interface GetMetricsResponse {
  totalIncome: number
  netBalance: number
  expense: Expense
  investment: Investment
  saving: Saving
}


export async function getMetrics({ slug }: GetMetricsParams): Promise<GetMetricsResponse> {
  const response = await api.get(`/workspaces/${slug}/metrics`)

  return response.data
}