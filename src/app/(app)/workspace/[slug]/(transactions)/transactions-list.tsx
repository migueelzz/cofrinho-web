'use client'

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GetTransactionsResponse } from '@/http/get-transactions'

import dayjs from 'dayjs'
import { formatCurrencyBRL } from '@/utils/format-currency'
import { cn } from '@/lib/utils'

type TransactionListProps = {
  data: GetTransactionsResponse
}

export function TransactionList({ data }: TransactionListProps) {
  return (
    <div className="flex flex-col gap-2 mt-6">
      <span className="text-muted-foreground text-sm">Recentes</span>

      <div className="flex flex-col">
        <AnimatePresence>
          {data.items.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between border-b last:border-b-0 py-2"
              >
                <div className="flex items-center gap-3">
                  {transaction.type === 'INCOME' ? (
                    <ArrowUpRight className="size-5 text-emerald-500" />
                  ) : (
                    <ArrowDownLeft className="size-5 text-rose-500" />
                  )}

                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{transaction.description}</span>
                    <span className="text-xs text-muted-foreground">{dayjs(transaction.date).format('DD [de] MMM, YYYY')}</span>
                  </div>

                  <div className="flex items-center justify-center gap-1 w-min py-1 px-2 text-xs whitespace-nowrap rounded-full border">
                    <span>{transaction.category.emoji}</span>
                    <span>{transaction.category.name}</span>
                  </div>
                </div>
                <span className={cn("text-sm", transaction.type === 'INCOME' ? 'text-emerald-500 font-medium' : 'text-muted-foreground')}>
                  {transaction.type === 'INCOME' ? '+' : '-'}
                  {formatCurrencyBRL(transaction.amount)}
                </span>
              </motion.div>
            ))
          }

          {data.items.length === 0 && (
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
