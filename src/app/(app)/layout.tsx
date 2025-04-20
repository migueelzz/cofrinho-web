import { PiggyBank } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Workspaces'
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}
