'use client'

import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { GetMetricsResponse } from "@/http/get-metrics";

import { formatCurrencyBRL } from "@/utils/format-currency";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type SummaryProps = {
  data: GetMetricsResponse
}

export function Summary({ data }: SummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      {data && (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">Orçamento mensal</span>
            {data.budget ? (
              <div className="flex items-baseline gap-3">
                <h1 className={cn("text-4xl font-bold")}>
                  {formatCurrencyBRL(data.budget ? data.budget.remaining : 0)}
                </h1>
              </div>
            ) : (
              <Button variant='outline' className="w-min">
                <Plus className="size-4" />
                Definir orçamento mensal
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 my-4">
            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <span className="text-xs font-medium text-emerald-600">Receita</span>
                <p className="text-2xl font-semibold">
                  {formatCurrencyBRL(data.totalIncome)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="size-4 text-emerald-600" />
                <span className="text-xs text-muted-foreground">12% Em relação ao último mês</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <span className="text-xs font-medium text-rose-600">Despesas</span>
                <p className="text-2xl font-semibold">
                  {formatCurrencyBRL(data.expense.total)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <ArrowDownLeft className="size-4 text-rose-600" />
                <span className="text-xs text-muted-foreground">-8% Em relação ao último mês</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <span className="text-xs font-medium text-purple-600">Investimentos</span>
                <p className="text-2xl font-semibold">
                  {formatCurrencyBRL(data.investment.total)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="size-4 text-emerald-600" />
                <span className="text-xs text-muted-foreground">4% Em relação ao último mês</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <span className="text-xs font-medium text-amber-400">Poupança</span>
                <p className="text-2xl font-semibold">
                  {formatCurrencyBRL(data.saving.total)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="size-4 text-emerald-600" />
                <span className="text-xs text-muted-foreground">2% Em relação ao último mês</span>
              </div>
            </div>
          </div>

          {/* <SummaryChart /> */}

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="h-2.5 bg-rose-500 rounded-full"
                    style={{ width: `${data.expense.percentage}%` }}
                  />
                </TooltipTrigger>

                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Despesas</span>
                    <span className="text-sm font-medium">{formatCurrencyBRL(data.expense.total)}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="h-2.5 bg-purple-500 rounded-full"
                    style={{ width: `${data.investment.percentage}%` }}
                  />
                </TooltipTrigger>

                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Investimentos</span>
                    <span className="text-sm font-medium">{formatCurrencyBRL(data.investment.total)}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="h-2.5 bg-amber-500 rounded-full"
                    style={{ width: `${data.saving.percentage}%` }}
                  />
                </TooltipTrigger>

                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Poupança</span>
                    <span className="text-sm font-medium">{formatCurrencyBRL(data.saving.total)}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Legendas */}
          {data.expense.total !== 0 ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-rose-300 bg-rose-500" />
                <span className="text-xs text-muted-foreground">Despesas</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-purple-300 bg-purple-500" />
                <span className="text-xs text-muted-foreground">Investimentos</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-amber-300 bg-amber-500" />
                <span className="text-xs text-muted-foreground">Poupança</span>
              </div>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Nenhuma métrica por enquanto...</span>
          )}
        </>
      )}
    </div>
  );
}
