'use client'

import { useState } from "react";
import { Plus } from "lucide-react";
import { AddTransactionSheet } from "./add-transaction-sheet";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function AddTransaction() {
  const [isOpenTransactionSheet, setIsOpenTransactionSheet] = useState(false);

  return (
    <Sheet open={isOpenTransactionSheet} onOpenChange={setIsOpenTransactionSheet}>
      <SheetTrigger asChild>
        <Button size='sm' className="hidden sm:flex">
          <Plus className="size-4" />
          <span>Adicionar transação</span>
        </Button>
      </SheetTrigger>

      <AddTransactionSheet open={isOpenTransactionSheet} onChangeOpen={setIsOpenTransactionSheet} />
    </Sheet>
  )
}