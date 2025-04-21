"use client";

import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { AlertTriangle, Loader2, Plus } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { createWorkspaceAction } from "./actions";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQueryClient } from "@tanstack/react-query";

export function CreateWorkspaceForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createWorkspaceAction,
    async () => {
      toast.success("Workspace criado com sucesso!");
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.push(`/`);
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive" className="bg-red-100 border-0">
          <AlertTriangle className="size-4" />

          <AlertTitle>Falha ao criar workspace!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Input id="name" name="name" placeholder="Digite o nome do workspace" />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        Criar novo workspace
      </Button>
    </form>
  );
}
