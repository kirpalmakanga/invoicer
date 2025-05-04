import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { ReactNode } from 'react';

interface SlidePanel {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export function SlidePanel({ isOpen, title, children, onClose }: SlidePanel) {
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
