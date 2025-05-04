import { api } from "./api-client"

type GetMetricsParams = {
  slug: string
  startDate?: string | undefined
  endDate?: string | undefined
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
  budget: {
    total: number | null
    used: number
    remaining: number
    percentageUsed: number
  }
}


export async function getMetrics({ slug, startDate, endDate }: GetMetricsParams) {
  const searchParams = Object.entries({ startDate, endDate })
  .filter(([_, value]) => value !== undefined)
  .map(([key, value]) => [key, String(value)]);

  const response = await api.get(`workspaces/${slug}/metrics`, {
    searchParams,
  })
  .json<GetMetricsResponse>()

  return response
}