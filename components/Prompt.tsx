import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';

interface PromptProps {
    isOpen?: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    children?: ReactNode;
    onSubmit: () => void;
    onClose?: () => void;
}

export default function Prompt({
    isOpen,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    children,
    onSubmit,
    onClose,
}: PromptProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleCancellation = useCallback(() => {
        setOpen(false);

        onClose?.();
    }, []);

    const handleConfirmation = useCallback(() => {
        setOpen(false);

        onSubmit();
    }, []);

    useEffect(() => {
        if (typeof isOpen === 'boolean') {
            setOpen(isOpen);
        }
    }, [isOpen]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description ? (
                        <DialogDescription>{description}</DialogDescription>
                    ) : null}
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-4">
                    {cancelLabel ? (
                        <Button
                            className="bg-red-900 text-zinc-100 hover:bg-red-800 active:scale-90 transition"
                            onClick={handleCancellation}
                        >
                            {cancelLabel}
                        </Button>
                    ) : null}

                    <Button
                        className="bg-green-900 text-zinc-100 hover:bg-green-800 active:scale-90 transition"
                        onClick={handleConfirmation}
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
