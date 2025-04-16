'use client'

import { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/http/get-categories"
import { ScrollArea } from "@/components/ui/scroll-area"

type Category = {
  id: string
  emoji: string
  name: string
}

interface EmojiPickerProps {
  onSelect: (category: Category) => void
  selectedEmoji?: Category | null
}

export function EmojiPicker({ onSelect, selectedEmoji }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="size-12 text-2xl flex items-center justify-center rounded-full border bg-zinc-100"
          aria-label="Escolher emoji"
        >
          {selectedEmoji?.emoji ? selectedEmoji?.emoji : "💸"}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="pointer-events-auto scroll-auto flex flex-col gap-3 max-h-64 rounded-xl shadow-lg bg-white border w-72 px-3 pt-3 pb-0"
      >
        <span className="text-sm text-muted-foreground font-medium">Categorias</span>

        <ScrollArea className="w-full max-h-52 touch-auto">
          <div className="flex flex-wrap gap-4 text-2xl pb-4">
            {data?.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelect(category)
                  setOpen(false)
                }}
                className="flex flex-col gap-1 hover:scale-110 transition-transform"
              >
                {category.emoji}
                <span className="text-xs text-muted-foreground">{category.name}</span>
              </button>
            ))}
           
          </div>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Carregando categorias...</p>
          )}
          {!isLoading && data?.categories.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhuma categoria encontrada.</p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}