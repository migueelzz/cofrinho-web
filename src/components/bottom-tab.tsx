'use client'

import { Home, Plus, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { AddTransactionSheet } from "@/app/(app)/workspace/[slug]/(transactions)/add-transaction-sheet"

const tabs = [
  { label: "Início", icon: Home, href: "/" },
  { label: "Adicionar", icon: Plus, href: "/new" },
  { label: "Perfil", icon: User, href: "/profile" },
]

export function BottomTab() {
  const pathname = usePathname()

  const [isOpenTransactionSheet, setIsOpenTransactionSheet] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden z-50">
      <div className="flex justify-around items-center py-2">
        <Link href='/' className="flex flex-col items-center text-xs">
          <Home
            className={cn(
              "size-5 text-accent-foreground"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium text-accent-foreground",
            )}
          >
            Home
          </span>
        </Link>

        <Sheet open={isOpenTransactionSheet} onOpenChange={setIsOpenTransactionSheet}>
          <SheetTrigger asChild>
            <Button size='icon' className="rounded-full">
              <Plus className="size-4" />
            </Button>
          </SheetTrigger>

          <AddTransactionSheet open={isOpenTransactionSheet} onChangeOpen={setIsOpenTransactionSheet} />
        </Sheet>

        <Link href='/' className="flex flex-col items-center text-xs">
          <User
            className={cn(
              "size-5 text-muted-foreground",
            )}
          />
          <span
            className={cn(
              "text-xs text-muted-foreground",
            )}
          >
            Perfil
          </span>
        </Link>
      </div>
    </nav>
  )
}
