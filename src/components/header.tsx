import { Slash } from "lucide-react";
import { AccountMenu } from "./account-menu";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 left-0 bg-white border-b lg:border-b-0 w-full p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Logo />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <WorkspaceSwitcher />
      </div>

      <AccountMenu />
    </header>
  )
}