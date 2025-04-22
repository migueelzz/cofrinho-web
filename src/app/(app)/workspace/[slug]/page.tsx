import { Summary } from "@/components/summary";
import { TransactionList } from "@/app/(app)/workspace/[slug]/(transactions)/transactions-list";
import { AddTransaction } from "./(transactions)/add-transaction";

export default function Workspace() {
  return (
    <main className="flex flex-col gap-4 p-4">
      {/* <ExpensesChart /> */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">Despesas</span>

        <div className="flex items-center gap-2">
          {/* <Select>
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
          </Select> */}

          <AddTransaction />
        </div>
      </div>

      <Summary />

      <TransactionList />
    </main>
  );
}