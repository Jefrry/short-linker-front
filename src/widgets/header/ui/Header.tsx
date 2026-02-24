import { useState } from 'react';
import { Link } from 'react-router';

import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/app/providers/ThemeProvider';

import { SigninForm } from '@/features/signinByEmail';
import { SignupForm } from '@/features/signupByEmail';

import { useAuth, User, useUser } from '@/entities/user';

import { getRouteDashboard, getRouteHome } from '@/shared/config/routes';

import { Button } from '@/shared/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/shadcn/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/tabs';

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
        <Link className="flex items-center gap-4" draggable={false} to={getRouteHome()}>
          <img alt="Short Linker" className="size-10" draggable={false} src="/logo.svg" />
        </Link>

        <div className="flex items-center gap-1.5">
          {isLoading ? (
            <Skeleton />
          ) : user ? (
            <UserInfo user={user} />
          ) : (
            <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
              <DialogTrigger asChild>
                <Button className="mr-2 cursor-pointer" size="sm" variant="outline">
                  Sign In
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>{authTab === 'signin' ? 'Sign In' : 'Create Account'}</DialogTitle>
                </DialogHeader>

                <Tabs className="w-full" value={authTab} onValueChange={handleAuthTabChange}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger className="cursor-pointer" value="signin">
                      Sign In
                    </TabsTrigger>

                    <TabsTrigger className="cursor-pointer" value="signup">
                      Sign Up
                    </TabsTrigger>
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

          <Button
            className="cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

const UserInfo = ({ user }: { user: User }) => {
  const { signout } = useAuth();

  return (
    <div className="flex items-center gap-4 mr-2">
      <span className="text-sm font-medium">Hello, {user.name}</span>

      <Link to={getRouteDashboard()}>
        <Button className="cursor-pointer" size="sm" variant="ghost">
          Dashboard
        </Button>
      </Link>

      <Button
        className="cursor-pointer"
        size="sm"
        variant="outline"
        onClick={() => signout.mutate()}
      >
        Sign Out
      </Button>
    </div>
  );
};

const Skeleton = () => <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />;
