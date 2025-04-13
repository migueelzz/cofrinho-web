'use client'

import { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

const EMOJIS = [
  "💰", "🍔", "🛒", "🏠", "🎁", "🚗", "📱", "📚", "🛏️", "🧼",
  "👕", "🍕", "🎮", "💡", "💻", "💳", "🧃", "🐶", "✈️", "📦",
  "💸", "😀"
]

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  selectedEmoji?: string
}

export function EmojiPicker({ onSelect, selectedEmoji }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="size-12 text-2xl rounded-full border bg-zinc-100"
          aria-label="Escolher emoji"
        >
          {selectedEmoji || "😀"}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="flex flex-col gap-3 w-64 max-h-64 overflow-y-auto p-3 rounded-xl shadow-lg bg-white border sm:w-72"
        side="bottom"
      >
        <span className="text-sm text-muted-foreground font-medium">Emojis</span>
        
        <div className="grid grid-cols-6 gap-2 text-2xl ">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onSelect(emoji)
                setOpen(false)
              }}
              className="hover:scale-110 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
