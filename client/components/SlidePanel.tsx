import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { ReactNode } from 'react';

interface SlidePanelProps {
    className?: string;
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children?: ReactNode;
}

export function SlidePanel({
    isOpen,
    title,
    children,
    onClose,
    className,
}: SlidePanelProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className={className}>
                <SheetHeader className="border-b-2">
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>

                {isOpen ? children : null}
            </SheetContent>
        </Sheet>
    );
}
