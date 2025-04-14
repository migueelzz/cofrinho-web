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
      {/* <header className="fixed top-0 left-0 p-4">
        <PiggyBank className="size-8 -rotate-12 text-zinc-700" />
      </header> */}
      <div className="flex items-center min-h-screen w-full justify-center px-4">
        {children}
      </div>
    </div>
  );
}
