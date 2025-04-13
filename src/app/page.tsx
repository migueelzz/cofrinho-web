import { AddTransactionSheet } from "@/components/add-transaction-sheet";
import TransactionList from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, TrendingUp } from "lucide-react";

const transactions = [
  {
    id: 1,
    icon: "🏠️",
    title: "Aluguel",
    date: "01 de Abr, 2025",
    amount: "R$1.000,00",
  },
  {
    id: 2,
    icon: "🍔",
    title: "Alimentação",
    date: "03 de Abr, 2025",
    amount: "R$320,00",
  },
  {
    id: 3,
    icon: "💡",
    title: "Energia",
    date: "05 de Abr, 2025",
    amount: "R$145,90",
  },
  {
    id: 4,
    icon: "📱",
    title: "Celular",
    date: "06 de Abr, 2025",
    amount: "R$90,00",
  },
  {
    id: 5,
    icon: "🚌",
    title: "Transporte",
    date: "07 de Abr, 2025",
    amount: "R$75,00",
  },
  {
    id: 6,
    icon: "🛒",
    title: "Mercado",
    date: "08 de Abr, 2025",
    amount: "R$580,00",
  },
  {
    id: 7,
    icon: "🎮",
    title: "Lazer",
    date: "09 de Abr, 2025",
    amount: "R$150,00",
  },
  {
    id: 8,
    icon: "💊",
    title: "Farmácia",
    date: "10 de Abr, 2025",
    amount: "R$65,00",
  },
  {
    id: 9,
    icon: "💼",
    title: "Investimento",
    date: "11 de Abr, 2025",
    amount: "R$1.200,00",
  },
  {
    id: 10,
    icon: "💻",
    title: "Assinatura Software",
    date: "12 de Abr, 2025",
    amount: "R$89,99",
  },
  {
    id: 11,
    icon: "🎓",
    title: "Educação",
    date: "13 de Abr, 2025",
    amount: "R$450,00",
  },
  {
    id: 12,
    icon: "☕",
    title: "Café",
    date: "14 de Abr, 2025",
    amount: "R$18,00",
  },
]

export default function Home() {
  const expense = 50
  const investing = 30
  const saving = 20

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">Despesas</span>

        <div className="flex items-center gap-2">
          <Select>
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
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button size='sm' className="hidden lg:flex">
                <Plus className="size-4" />
                <span>Adicionar transação</span>
              </Button>
            </SheetTrigger>

            <AddTransactionSheet />
          </Sheet>
        </div>

      </div>
    
      <div className="flex items-baseline gap-3">
        <h1 className="text-4xl font-extrabold">R$1,600.00</h1>
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
          <TrendingUp className="size-3" />
          <span>R$200</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-2.5 bg-rose-500 rounded-full" style={{ width: `${expense}%` }} />
            </TooltipTrigger>

            <TooltipContent>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Despesas</span>
                <span className="text-sm font-medium">{expense}%</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-2.5 bg-purple-500 rounded-full" style={{ width: `${investing}%` }} />
            </TooltipTrigger>

            <TooltipContent>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Investimentos</span>
                <span className="text-sm font-medium">{investing}%</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-2.5 bg-amber-500 rounded-full" style={{ width: `${saving}%` }} />
            </TooltipTrigger>

            <TooltipContent>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Poupança</span>
                <span className="text-sm font-medium">{saving}%</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full border-2 border-rose-300 bg-rose-500" />
          <span className="text-xs text-muted-foreground font-medium">Despesas</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full border-2 border-purple-300 bg-purple-500" />
          <span className="text-xs text-muted-foreground font-medium">Investimentos</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full border-2 border-amber-300 bg-amber-500" />
          <span className="text-xs text-muted-foreground font-medium">Poupança</span>
        </div>

      </div>

      <TransactionList />
    </main>
  );
}
