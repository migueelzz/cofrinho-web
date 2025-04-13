import { ChevronDown, Info, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex flex-col text-right">
            <h4 className="text-sm font-semibold">Miguel Lemes</h4>
            <p className="text-xs text-muted-foreground">
              miguellemes005@gmail.com
            </p>
          </div>

          <Avatar className="size-10">
            <AvatarImage src="https://github.com/migueelzz.png" />
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>

          <ChevronDown className="hidden lg:flex size-4 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex space-x-2 p-2">
          <Avatar>
            <AvatarImage src="https://github.com/migueelzz.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-0">
            <h4 className="text-sm font-semibold">Miguel Lemes</h4>
            <p className="text-xs text-muted-foreground">
              miguellemes005@gmail.com
            </p>
          </div>
        </div>

        <Separator className="my-2" />

        <DropdownMenuItem asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start font-normal text-muted-foreground">
            <User className="size-4" />
            Minha conta
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start font-normal text-muted-foreground">
            <Settings className="size-4" />
            Configurações
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start font-normal text-muted-foreground">
            <Info className="size-4" />
            Ajuda
          </Button>
        </DropdownMenuItem>

        <Separator className="my-2" />

        <DropdownMenuItem asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start font-normal text-muted-foreground">
            <LogOut className="size-4" />
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}