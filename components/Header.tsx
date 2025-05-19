'use client';

import { useCallback, useState } from 'react';
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
import { SlidePanel } from '@/components/SlidePanel';
import { SignUpForm } from '@/components/auth/SignUpForm';

import { useAuthStore } from '@/store/auth';
import { Authenticated } from './Authenticated';
import { Unauthenticated } from './Unauthenticated';
import { redirect } from '@/lib/api';
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu';

function ProfileDropDown() {
    const [isSignUpFormOpen, setIsSignUpFormOpen] = useState<boolean>(false);

    const openSignUpForm = useCallback(() => {
        setIsSignUpFormOpen(true);
    }, []);

    const closeSignUpForm = useCallback(() => {
        setIsSignUpFormOpen(false);
    }, []);

    const logOut = useAuthStore(({ logOut }) => logOut);

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
                                href="/"
                            >
                                <File className="text-current" /> Invoices
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                className="items-center gap-2 text-zinc-100 no-underline"
                                href="/customers"
                            >
                                <Users className="text-current" />
                                Customers
                            </Link>
                        </DropdownMenuItem>
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
                            onClick={logOut}
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
                            onClick={openSignUpForm}
                        >
                            <UserPlus className="text-current" />
                            Sign up
                        </DropdownMenuItem>
                    </Unauthenticated>
                </DropdownMenuContent>
            </DropdownMenu>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Sign up"
                isOpen={isSignUpFormOpen}
                onClose={closeSignUpForm}
            >
                <SignUpForm onSubmit={closeSignUpForm} />
            </SlidePanel>
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
                                    <Link href="/">
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Invoices
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/customers" passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Customers
                                        </NavigationMenuLink>
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
