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
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { SlidePanel } from '@/components/SlidePanel';
import { LogInForm } from '@/components/auth/LogInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';

import { useAuthStore } from '@/store/auth';
function ProfileDropDown() {
    const isLoggedIn = useAuthStore(
        useShallow(({ accessToken }) => !!accessToken)
    );

    const [isSignUpFormOpen, setIsSignUpFormOpen] = useState<boolean>(false);
    const [isLogInFormOpen, setIsLogInFormOpen] = useState<boolean>(false);

    const openSignUpForm = useCallback(() => {
        setIsSignUpFormOpen(true);
    }, []);

    const closeSignUpForm = useCallback(() => {
        setIsSignUpFormOpen(false);
    }, []);

    const openLogInForm = useCallback(() => {
        setIsLogInFormOpen(true);
    }, []);

    const closeLogInForm = useCallback(() => {
        setIsLogInFormOpen(false);
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
                    {isLoggedIn ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem
                                className="items-center gap-2"
                                onClick={openLogInForm}
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
                        </>
                    )}
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

            <SlidePanel
                className="sm:max-w-1/2"
                title="Log in"
                isOpen={isLogInFormOpen}
                onClose={closeLogInForm}
            >
                <LogInForm onSubmit={closeLogInForm} />
            </SlidePanel>
        </>
    );
}

export default function Header() {
    const isLoggedIn = useAuthStore(
        useShallow(({ accessToken }) => !!accessToken)
    );

    const [isCustomerFormOpen, setIsCustomerFormOpen] =
        useState<boolean>(false);
    const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState<boolean>(false);

    const openCustomerForm = useCallback(() => {
        setIsCustomerFormOpen(true);
    }, []);

    const closeCustomerForm = useCallback(() => {
        setIsCustomerFormOpen(false);
    }, []);

    const openInvoiceForm = useCallback(() => {
        setIsInvoiceFormOpen(true);
    }, []);

    const closeInvoiceForm = useCallback(() => {
        setIsInvoiceFormOpen(false);
    }, []);

    return (
        <>
            <header className="p-4 flex justify-between items-center container mx-auto">
                <Link className="text-primary font-bold uppercase" href="/">
                    Invoicer
                </Link>

                <div className="flex gap-2">
                    {isLoggedIn ? (
                        <>
                            <Button className="h-8" onClick={openCustomerForm}>
                                Add customer
                            </Button>
                            <Button className="h-8" onClick={openInvoiceForm}>
                                Add invoice
                            </Button>
                        </>
                    ) : null}

                    <ProfileDropDown />
                </div>
            </header>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Add customer"
                isOpen={isCustomerFormOpen}
                onClose={() => setIsCustomerFormOpen(false)}
            >
                <CustomerForm onSubmit={closeCustomerForm} />
            </SlidePanel>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Add invoice"
                isOpen={isInvoiceFormOpen}
                onClose={() => setIsInvoiceFormOpen(false)}
            >
                <InvoiceForm onSubmit={closeInvoiceForm} />
            </SlidePanel>
        </>
    );
}
