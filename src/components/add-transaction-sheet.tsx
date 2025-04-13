'use client'

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EmojiPicker } from "./emoji-picker"

export function AddTransactionSheet() {
  const [emoji, setEmoji] = useState("💸")

  return (
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>Adicionar transação</SheetTitle>
      </SheetHeader>

      <ScrollArea className="h-96 px-3 pr-3">
        <div className="flex flex-col gap-5 px-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Emoji</span>
          <EmojiPicker selectedEmoji={emoji} onSelect={setEmoji} />
        </div>

          {/* Valor */}
          <div className="flex flex-col gap-2">
            <Label>Valor</Label>
            <Input type="number" placeholder="Ex: 100.00" />
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            <Label>Nome</Label>
            <Input placeholder="Ex.: Supermercado, Academia..." />
          </div>
        </div>
      </ScrollArea>

      <SheetFooter className="mt-4">
        <SheetClose asChild>
          <Button type="submit" size='lg' className="w-full">Adicionar</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}
