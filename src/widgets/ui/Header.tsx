import { useTheme } from "@/app/providers/ThemeProvider";
import { Button } from "@/shared";
import { MoonIcon, SunIcon } from "lucide-react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="Short Linker" className="size-10" draggable={false} />
        </div>

        <div className="flex items-center gap-1.5">
            <Button className="cursor-pointer" variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
            </Button>
        </div>
      </div>
    </header>
  );
};
