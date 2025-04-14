import { BottomTab } from "@/components/bottom-tab";
import { Header } from "@/components/header";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full pb-16 lg:pb-0">
      <div className="w-full max-w-[1120px] mx-auto">
        <Header />
        {children}
      </div>

      <BottomTab />
    </div>
  );
}
