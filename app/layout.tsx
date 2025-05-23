import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import { Interceptors } from '@/components/Interceptors';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Invoicer',
    description: 'Simple invoice editing/management app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased dark min-h-screen flex flex-col`}
            >
                <Interceptors>
                    <Header />

                    {/* <Authenticated> */}
                    <main className="flex flex-col grow p-4 container mx-auto">
                        {children}
                    </main>
                    {/* </Authenticated> */}
                </Interceptors>

                <Toaster />
            </body>
        </html>
    );
}
