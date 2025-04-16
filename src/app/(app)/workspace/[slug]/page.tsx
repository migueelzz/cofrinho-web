'use client'

import { AddTransactionSheet } from "@/components/add-transaction-sheet";
import { Summary } from "@/components/summary";
import TransactionList from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Workspace() {
  const [isOpenTransactionSheet, setIsOpenTransactionSheet] = useState(false);

  return (
    <main className="flex flex-col gap-4 p-4">
      {/* <ExpensesChart /> */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">Despesas</span>

        <div className="flex items-center gap-2">
          {/* <Select>
            <SelectTrigger size="sm" className="w-[130px]">
              <SelectValue placeholder="Está semana" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="week">Está semana</SelectItem>
                <SelectItem value="banana">Este mês</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
                <SelectItem value="current">Até o momento</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}

          <Sheet open={isOpenTransactionSheet} onOpenChange={setIsOpenTransactionSheet}>
            <SheetTrigger asChild>
              <Button size='sm' className="hidden lg:flex">
                <Plus className="size-4" />
                <span>Adicionar transação</span>
              </Button>
            </SheetTrigger>

            <AddTransactionSheet onChangeOpen={setIsOpenTransactionSheet} />
          </Sheet>
        </div>

      </div>

      <Summary />

      <TransactionList />
    </main>
  );
}
