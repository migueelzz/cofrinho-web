'use client'

import { Summary } from "@/components/summary";
import { TransactionList } from "@/app/(app)/workspace/[slug]/(transactions)/transactions-list";
import { AddTransaction } from "./(transactions)/add-transaction";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/http/get-transactions";
import { getMetrics } from "@/http/get-metrics";
import { Skeleton } from "@/components/ui/skeleton";

export default function Workspace() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const params = useParams<{ slug: string }>()
  const { slug } = params

  const startDate = searchParams.get('startDate') ?? undefined
  const endDate = searchParams.get('endDate') ?? undefined

  // const currentDate = new Date();
  // const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  // const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions', slug, startDate, endDate],
    queryFn: () => getTransactions({ 
      slug, 
      startDate: startDate ?? undefined, 
      endDate: endDate ?? undefined,
    }),
    staleTime: 1000 * 60 * 10,
    enabled: !!slug,
  })

  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["summary", slug, startDate, endDate],
    queryFn: () => getMetrics({ 
      slug, 
      startDate: startDate ?? undefined, 
      endDate: endDate ?? undefined,
     }),
    staleTime: 1000 * 60 * 10,
    enabled: !!slug,
  });

  function getPeriodDates(value: string): { startDate: string; endDate: string } {
    const currentDate = new Date();
  
    if (value === "current_month") {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
      return {
        startDate: firstDayOfMonth.toISOString().split("T")[0],
        endDate: lastDayOfMonth.toISOString().split("T")[0],
      };
    }
  
    if (value === "last_month") {
      const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  
      return {
        startDate: firstDayOfLastMonth.toISOString().split("T")[0],
        endDate: lastDayOfLastMonth.toISOString().split("T")[0],
      };
    }
  
    if (value === "current_year") {
      const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);
  
      return {
        startDate: firstDayOfYear.toISOString().split("T")[0],
        endDate: lastDayOfYear.toISOString().split("T")[0],
      };
    }
  
    if (value === "yet") {
      return {
        startDate: "2025-01-01", // Ajuste para o início do período desejado
        endDate: currentDate.toISOString().split("T")[0],
      };
    }
  
    throw new Error("Período inválido");
  }

  const handleSelectChange = (value: string) => {
    try {
      const { startDate, endDate } = getPeriodDates(value);

      // Atualizar os parâmetros da URL
      const updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.set("startDate", startDate);
      updatedParams.set("endDate", endDate);

      router.push(`/workspace/${slug}?${updatedParams.toString()}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="space-y-10 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resumo</h1>

        <Select onValueChange={handleSelectChange}>
          <SelectTrigger size="sm" className="w-[130px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="current_month">Este mês</SelectItem>
              <SelectItem value="last_month">Último mês</SelectItem>
              <SelectItem value="current_year">Este ano</SelectItem>
              <SelectItem value="yet">Até o momento</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      {metrics && <Summary data={metrics} />}

      {!metrics && isLoadingMetrics && (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-12 h-5" />
          <Skeleton className="w-60 h-14" />

          <div className="flex items-center gap-2">
            <Skeleton className="w-full h-3 rounded-full" />
            <Skeleton className="w-full h-3 rounded-full" />
            <Skeleton className="w-1/3 h-3 rounded-full" />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Transações</span>
          <AddTransaction />
        </div>

        {transactions && <TransactionList data={transactions} />}

        {!transactions && isLoadingTransactions && (
          <div className='flex flex-col gap-3'>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-12" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}