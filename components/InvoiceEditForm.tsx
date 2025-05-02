import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useCallback } from 'react';

interface Props {
    isOpen: boolean;
    formData?: Invoice;
    onClose: () => void;
}

export function InvoiceEditForm({ isOpen, formData, onClose }: Props) {
    const onSubmit = useCallback(() => {
        onClose();
    }, []);

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader className="border-b-2">
                    <SheetTitle>
                        {formData ? 'Edit invoice' : 'Create invoice'}
                    </SheetTitle>
                </SheetHeader>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
                {/* 
                <div className="grid gap-4 p-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            ID
                        </Label>
                        Prefix + year + Autoincrement
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Customer
                        </Label>
                        Customer Select
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Status
                        </Label>
                        Status select
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Payment method
                        </Label>
                        Payment method select
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Items
                        </Label>
                        Invoice Items table + inner state + onUpdate event
                    </div>
                </div> */}

                <SheetFooter>
                    <Button type="submit" onClick={onSubmit}>
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
