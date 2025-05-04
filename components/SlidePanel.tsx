import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { ReactNode } from 'react';

interface SlidePanelProps {
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
}: SlidePanelProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader className="border-b-2">
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>

                {isOpen ? children : null}
            </SheetContent>
        </Sheet>
    );
}
