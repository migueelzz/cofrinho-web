'use client'

import { HomeIcon, PiggyBank, Slash } from "lucide-react";
import { NavLink } from "./nav-link";
import { AccountMenu } from "./account-menu";
import { WorkspaceSwitcher } from "./workspace-switcher";

const MENUS = [
  {
    title: "Home",
    icon: HomeIcon,
    href: "/",
  }
]

export function Header() {
  return (
    <header className="sticky top-0 left-0 bg-white border-b lg:border-b-0 w-full p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PiggyBank className="size-8 -rotate-12 text-zinc-700" />

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