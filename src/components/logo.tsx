'use client'

import { useWorkspace } from "@/context/workspace-context";
import { PiggyBank } from "lucide-react";
import Link from "next/link";

export function Logo() {
  const { currentWorkspace } = useWorkspace()

  return (
    <Link href={`/workspace/${currentWorkspace?.slug}`}>
      <PiggyBank className="size-8 -rotate-12 text-zinc-700" />
    </Link>
  )
}