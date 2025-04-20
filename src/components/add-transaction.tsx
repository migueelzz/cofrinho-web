'use client'

import { useState } from "react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { AddTransactionSheet } from "./add-transaction-sheet";

export function AddTransaction() {
  const [isOpenTransactionSheet, setIsOpenTransactionSheet] = useState(false);

  return (
    <Sheet open={isOpenTransactionSheet} onOpenChange={setIsOpenTransactionSheet}>
      <SheetTrigger asChild>
        <Button size='sm' className="hidden lg:flex">
          <Plus className="size-4" />
          <span>Adicionar transação</span>
        </Button>
      </SheetTrigger>

      <AddTransactionSheet onChangeOpen={setIsOpenTransactionSheet} />
    </Sheet>
  )
}