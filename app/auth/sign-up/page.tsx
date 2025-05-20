'use client';

import H1 from '@/components/atoms/H1';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const { push } = useRouter();

    return (
        <>
            <H1 className="mb-8">Sign up</H1>

            <div className="md:w-md mx-auto">
                <SignUpForm onSubmit={() => push('/auth/sign-up/success')} />
            </div>
        </>
    );
}
