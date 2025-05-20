'use client';

import Link from 'next/link';
import {
    File,
    LogIn,
    LogOut,
    Settings,
    User,
    UserPlus,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { useAuthStore } from '@/store/auth';
import { Authenticated } from './Authenticated';
import { Unauthenticated } from './Unauthenticated';
import { redirect } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function ProfileDropDown() {
    const { push } = useRouter();

    const logOut = useAuthStore(({ logOut }) => logOut);

    const handleLogOut = useCallback(() => {
        logOut();

        push('/');
    }, []);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <User className="size-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <Authenticated>
                        <DropdownMenuItem asChild>
                            <Link
                                className="items-center gap-2 text-zinc-100 no-underline"
                                href="/settings"
                            >
                                <Settings className="text-current" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="items-center gap-2 text-red-700"
                            onClick={handleLogOut}
                        >
                            <LogOut className="text-current" />
                            Log out
                        </DropdownMenuItem>
                    </Authenticated>

                    <Unauthenticated>
                        <DropdownMenuItem
                            className="items-center gap-2"
                            onClick={redirect}
                        >
                            <LogIn className="text-current" />
                            Log in
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="items-center gap-2"
                            onClick={() => push('/auth/sign-up')}
                        >
                            <UserPlus className="text-current" />
                            Sign up
                        </DropdownMenuItem>
                    </Unauthenticated>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default function Header() {
    return (
        <>
            <header className="p-4 flex justify-between items-center container mx-auto">
                <Link className="text-primary font-bold uppercase" href="/">
                    Invoicer
                </Link>

                <div className="flex gap-2">
                    <Authenticated>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link
                                        href="/"
                                        className={navigationMenuTriggerStyle()}
                                        passHref
                                    >
                                        Invoices
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        href="/customers"
                                        className={navigationMenuTriggerStyle()}
                                        passHref
                                    >
                                        Customers
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </Authenticated>

                    <ProfileDropDown />
                </div>
            </header>
        </>
    );
}
