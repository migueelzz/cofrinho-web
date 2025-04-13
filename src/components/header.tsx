'use client'

import { HomeIcon, PiggyBank } from "lucide-react";
import { NavLink } from "./nav-link";
import { AccountMenu } from "./account-menu";

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
      <PiggyBank className="size-8 -rotate-12 text-zinc-700" />

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