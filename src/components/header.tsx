'use client'

import { PiggyBank, Slash } from "lucide-react";
import { AccountMenu } from "./account-menu";
import { WorkspaceSwitcher } from "./workspace-switcher";
import Link from "next/link";
import { useWorkspace } from "@/context/workspace-context";

export function Header() {
  const { currentWorkspace } = useWorkspace()

  return (
    <header className="sticky top-0 left-0 bg-white border-b lg:border-b-0 w-full p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href={`/workspace/${currentWorkspace?.slug}`}>
          <PiggyBank className="size-8 -rotate-12 text-zinc-700" />
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <WorkspaceSwitcher />
      </div>

      {/* <div className="flex items-center gap-6">
        {MENUS.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink key={`${item.title} - ${index}`} title={item.title} href={item.href} icon={Icon} />
          );
        })}
      </div> */}

      <AccountMenu />
    </header>
  )
}