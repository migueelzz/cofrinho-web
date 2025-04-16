'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Loader2, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '@/http/get-transactions'
import { useParams } from 'next/navigation'

import dayjs from 'dayjs'
import { formatCurrencyBRL } from '@/utils/format-currency'

export default function TransactionList() {
  const params = useParams<{ slug: string }>()
  const { slug } = params

  const [search, setSearch] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({ slug }),
    staleTime: 1000 * 60 * 10,
    enabled: !!slug,
  })

  
  const filtered = data ? data.transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  ) : []

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
          {!data && isLoading && (
            <div className='flex items-center justify-center gap-2 text-muted-foreground text-sm p-4'>
              <Loader2 className="size-4 animate-spin" />
              <span>Carregando...</span>
            </div>
          )}

          {filtered.length > 0 && (
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
                    {transaction.category.emoji}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{transaction.description}</span>
                    <span className="text-xs text-muted-foreground">{dayjs(transaction.date).format('DD [de] MMM, YYYY')}</span>
                  </div>
                </div>
                <span className="text-sm font-medium">{formatCurrencyBRL(transaction.amount)}</span>
              </motion.div>
            ))
          )}

          {!isLoading && filtered.length === 0 && (
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
