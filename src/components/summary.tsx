'use client'

import { TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getMetrics } from "@/http/get-metrics";
import { Skeleton } from "./ui/skeleton";

import { formatCurrencyBRL } from "@/utils/format-currency";

export function Summary() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data, isLoading } = useQuery({
    queryKey: ["summary", slug],
    queryFn: () => getMetrics({ slug }),
    staleTime: 1000 * 60 * 10,
    enabled: !!slug,
  });

  return (
    <div className="flex flex-col gap-4">
      {data && (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Saldo total</span>
            <div className="flex items-baseline gap-3">
              <h1 className="text-4xl font-extrabold">{formatCurrencyBRL(data.netBalance)}</h1>
              {/* <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <TrendingUp className="size-3" />
                <span>{formatCurrencyBRL(200)}</span>
              </div> */}
            </div>
          </div>

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
          {data.netBalance > 0 ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-rose-300 bg-rose-500" />
                <span className="text-xs text-muted-foreground font-medium">Despesas</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-purple-300 bg-purple-500" />
                <span className="text-xs text-muted-foreground font-medium">Investimentos</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-amber-300 bg-amber-500" />
                <span className="text-xs text-muted-foreground font-medium">Poupança</span>
              </div>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Nenhuma métrica por enquanto...</span>
          )}
        </>
      )}

      {!data && isLoading && (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-60 h-10" />

          <div className="flex items-center gap-2">
            <Skeleton className="w-full h-3 rounded-full" />
            <Skeleton className="w-full h-3 rounded-full" />
            <Skeleton className="w-1/3 h-3 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
