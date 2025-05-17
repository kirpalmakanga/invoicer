'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import {
    File,
    Handshake,
    LogIn,
    LogOut,
    Settings,
    User,
    User2,
    Users,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { register } from '@/lib/api';

function ProfileDropDown() {
    const logIn = useAuthStore(({ logIn }) => logIn);
    const logOut = useAuthStore(({ logOut }) => logOut);
    const isLoggedIn = useAuthStore(
        useShallow(({ accessToken }) => !!accessToken)
    );

    return (
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
                        {' '}
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
                            onClick={register}
                        >
                            <LogIn className="text-current" />
                            Register
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="items-center gap-2"
                            onClick={logIn}
                        >
                            <LogIn className="text-current" />
                            Log in
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function Header() {
    const [isCustomerFormOpen, setIsCustomerFormOpen] =
        useState<boolean>(false);
    const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState<boolean>(false);

    function openCustomerForm() {
        setIsCustomerFormOpen(true);
    }

    function closeCustomerForm() {
        setIsCustomerFormOpen(false);
    }

    function openInvoiceForm() {
        setIsInvoiceFormOpen(true);
    }

    function closeInvoiceForm() {
        setIsInvoiceFormOpen(false);
    }

    return (
        <>
            <header className="p-4 flex justify-between items-center container mx-auto">
                <Link className="text-primary font-bold uppercase" href="/">
                    Invoicer
                </Link>

                <div className="flex gap-2">
                    <Button className="h-8" onClick={openCustomerForm}>
                        Add customer
                    </Button>
                    <Button className="h-8" onClick={openInvoiceForm}>
                        Add invoice
                    </Button>

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
