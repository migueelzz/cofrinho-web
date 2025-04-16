'use client'

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EmojiPicker } from "./emoji-picker"
import { useIsMobile } from "@/hooks/use-mobile"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTransaction } from "@/http/create-transaction"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { getCategories } from "@/http/get-categories"

// Define o schema de validação com Zod
const transactionSchema = z.object({
  amount: z.number(),
  categoryId: z.string().nonempty("Selecione uma categoria"),
  description: z.string(),
  type: z.enum(["INCOME", "EXPENSE", "INVESTMENT", "SAVING"], { message: "Selecione um tipo válido" }),
  date: z.string(),
  isRecurring: z.boolean(),
  notifyUser: z.boolean(),
})

type TransactionFormValues = z.infer<typeof transactionSchema>

type AddTransactionSheetProps = {
  onChangeOpen: (open: boolean) => void
}

export function AddTransactionSheet({ onChangeOpen }: AddTransactionSheetProps) {
  const queryClient = useQueryClient()

  const isMobile = useIsMobile()

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  })

  const params = useParams<{ slug: string }>()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 10,
      description: "",
      type: "INCOME",
      date: new Date().toISOString(),
      isRecurring: false,
      notifyUser: false,
    },
  })

  const { mutateAsync: createTransactionFn, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      // Invalida as queries relacionadas às transações e ao resumo
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      await queryClient.invalidateQueries({ queryKey: ["summary"] });
  
      onChangeOpen(false); // Fecha o modal após a criação
    },
  });

  const onSubmit = async (data: TransactionFormValues) => {
    console.log(data)
    try {
      const payload = {
        ...data,
        date: new Date(Date.now()).toISOString(),
        workspaceSlug: params.slug,
      }

      console.log("Payload:", payload)

      await createTransactionFn({
        ...payload
      })

      toast.success("Transação criada com sucesso!")
    } catch (error) {
      console.error("Erro ao criar transação:", error)
      toast.error("Erro ao criar transação. Tente novamente.")
    }
  }

  return (
    <SheetContent 
      side={isMobile ? "bottom" : "right"}
      className="overflow-y-auto pointer-events-auto"
    >
      <SheetHeader>
        <SheetTitle>Adicionar transação</SheetTitle>
      </SheetHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 h-full">
        <div className="space-y-4 px-4">
          <div className="flex flex-col gap-2">
            <Label>Categoria</Label>
            <Controller 
              control={control}
              name="categoryId"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      <SelectLabel>Categorias</SelectLabel>
                      {data?.categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.emoji} {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Valor */}
          <div className="flex flex-col gap-2">
            <Label>Valor</Label>
            <div className="relative h-9">
              <Input
                type="number"
                step="0.01"
                placeholder="Ex: 100.00"
                className="ps-9"
                {...register("amount", { valueAsNumber: true })}
              />

              <span className="absolute left-3 top-1/2 -translate-y-1/2 inset-y-0 text-sm text-muted-foreground font-medium pointer-events-none">R$</span>
            </div>
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <Label>Descrição</Label>
            <Input
              placeholder="Ex.: Compra do mês, Mensalidade da academia..."
              {...register("description")}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Tipo de transação */}
          <div className="flex items-center gap-2">
            {["INCOME", "EXPENSE", "INVESTMENT", "SAVING"].map((type) => (
              <button
                key={type}
                type="button"
                data-active={watch("type") === type}
                className={`w-full text-sm font-medium cursor-pointer flex items-center justify-center gap-2 p-2 rounded-md active:scale-105 transition shadow-sm ${
                  watch("type") === type
                    ? type === "INCOME"
                      ? "text-white bg-emerald-500"
                      : type === "EXPENSE"
                      ? "text-white bg-rose-500"
                      : type === "INVESTMENT"
                      ? "text-white bg-purple-500"
                      : "text-white bg-amber-500"
                    : "text-gray-500 bg-zinc-200"
                }`}
                onClick={() => setValue("type", type as "INCOME" | "EXPENSE" | "INVESTMENT" | "SAVING")}
              >
                {type === "INCOME" && "Receita"}
                {type === "EXPENSE" && "Despesa"}
                {type === "INVESTMENT" && "Investimento"}
                {type === "SAVING" && "Poupança"}
              </button>
            ))}
          </div>
        </div>

        <SheetFooter className="mt-auto">
          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Adicionar
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  )
}