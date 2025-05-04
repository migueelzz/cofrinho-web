'use client'

import { PiggyBank } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Logo() {
  const { slug } = useParams<{
    slug: string
  }>()

  return (
    <Link href={`/workspace/${slug}`}>
      <PiggyBank className="size-8 -rotate-12 text-zinc-700" />
    </Link>
  )
}