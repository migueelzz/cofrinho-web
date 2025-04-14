'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { FileText, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'

const transactions = [
  { id: 1, icon: "🏠️", title: "Aluguel", date: "01 de Abr, 2025", amount: "R$1.000,00" },
  { id: 2, icon: "🍔", title: "Alimentação", date: "03 de Abr, 2025", amount: "R$320,00" },
  { id: 3, icon: "💡", title: "Energia", date: "05 de Abr, 2025", amount: "R$145,90" },
  { id: 4, icon: "📱", title: "Celular", date: "06 de Abr, 2025", amount: "R$90,00" },
  { id: 5, icon: "🚌", title: "Transporte", date: "07 de Abr, 2025", amount: "R$75,00" },
  { id: 6, icon: "🛒", title: "Mercado", date: "08 de Abr, 2025", amount: "R$580,00" },
  { id: 7, icon: "🎮", title: "Lazer", date: "09 de Abr, 2025", amount: "R$150,00" },
  { id: 8, icon: "💊", title: "Farmácia", date: "10 de Abr, 2025", amount: "R$65,00" },
  { id: 9, icon: "💼", title: "Investimento", date: "11 de Abr, 2025", amount: "R$1.200,00" },
  { id: 10, icon: "💻", title: "Assinatura Software", date: "12 de Abr, 2025", amount: "R$89,99" },
  { id: 11, icon: "🎓", title: "Educação", date: "13 de Abr, 2025", amount: "R$450,00" },
  { id: 12, icon: "☕", title: "Café", date: "14 de Abr, 2025", amount: "R$18,00" },
]

export default function TransactionList() {
  const [search, setSearch] = useState("")

  const filtered = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-3 mt-6">
      <span className="text-muted-foreground text-sm">Recentes</span>

      <div className="relative h-9">
        <Input
          className="ps-9 placeholder:text-sm"
          placeholder="Buscar por transações..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute pointer-events-none top-1/2 -translate-y-1/2 left-3 size-4 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-3 p-3 border rounded-md bg-zinc-50">
        <AnimatePresence>
          {filtered.length > 0 ? (
            filtered.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-8 rounded-full bg-white border">
                    {transaction.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{transaction.title}</span>
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  </div>
                </div>
                <span className="text-sm font-medium">{transaction.amount}</span>
              </motion.div>
            ))
          ) : (
            <motion.p
              key="not-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-muted-foreground py-4"
            >
              Nenhuma transação encontrada.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
