'use client'

import { LucideProps } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentType } from "react"

type NavLinkProps = {
  title: string
  icon: ComponentType<LucideProps>
  href: string
}

export function NavLink({ title, href, icon: Icon }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
    >
      <Icon size={20} />
      <span>{title}</span>
    </Link>
  )
}