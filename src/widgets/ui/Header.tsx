import { useState } from 'react';
import { Link } from 'react-router';
import { useTheme } from "@/app/providers/ThemeProvider";
import { Button } from "@/shared";
import { MoonIcon, SunIcon } from "lucide-react";
import { useUser, useAuth, User } from '@/entities/user';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { SigninForm } from '@/features/signinByEmail';
import { SignupForm } from '@/features/signupByEmail';

type AuthTab = 'signin' | 'signup';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: user, isLoading } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>('signin');

  const handleAuthTabChange = (value: string) => {
    setAuthTab(value as AuthTab);
  };
  
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <Link to="/" draggable={false} className="flex items-center gap-4">
            <img src="/logo.svg" alt="Short Linker" className="size-10" draggable={false} />
        </Link>

        <div className="flex items-center gap-1.5">
            {isLoading ? (
              <Skeleton />
            ) : user ? (
              <UserInfo user={user} />
            ) : (
              <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mr-2 cursor-pointer">Sign In</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>{authTab === 'signin' ? 'Sign In' : 'Create Account'}</DialogTitle>
                  </DialogHeader>

                  <Tabs value={authTab} onValueChange={handleAuthTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signin" className="cursor-pointer">Sign In</TabsTrigger>
                      <TabsTrigger value="signup" className="cursor-pointer">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                      <SigninForm onSuccess={() => setIsAuthModalOpen(false)} />
                    </TabsContent>

                    <TabsContent value="signup">
                      <SignupForm onSuccess={() => setIsAuthModalOpen(false)} />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}

            <Button className="cursor-pointer" variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
            </Button>
        </div>
      </div>
    </header>
  );
};

function UserInfo({ user }: { user: User }) {
  const { signout } = useAuth();

  return (
    <div className="flex items-center gap-4 mr-2">
      <span className="text-sm font-medium">Hello, {user.name}</span>

      <Link to="/dashboard">
        <Button variant="ghost" size="sm" className="cursor-pointer">
          Dashboard
        </Button>
      </Link>

      <Button variant="outline" size="sm" onClick={() => signout.mutate()} className="cursor-pointer">
        Sign Out
      </Button>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
  );
}
