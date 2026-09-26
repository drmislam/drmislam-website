"use client";

import { useState } from"react";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from"@/components/ui/dialog";
import { Button } from"@/components/ui/button";

interface ConfirmDeleteDialogProps {
 title?: string;
 description?: string;
 trigger: React.ReactNode;
 onConfirm: () => Promise<void>;
 isPending?: boolean;
}

export function ConfirmDeleteDialog({
 title ="Are you sure?",
 description ="This action cannot be undone. This will permanently delete this item.",
 trigger,
 onConfirm,
}: ConfirmDeleteDialogProps) {
 const [open, setOpen] = useState(false);
 const [isDeleting, setIsDeleting] = useState(false);

 const handleConfirm = async () => {
 setIsDeleting(true);
 try {
 await onConfirm();
 setOpen(false);
 } finally {
 setIsDeleting(false);
 }
 };

 return (
 <Dialog open={open} onOpenChange={setOpen}>
 <DialogTrigger render={trigger as React.ReactElement} />
 <DialogContent className="sm:max-w-md">
 <DialogHeader>
 <DialogTitle className="text-destructive">{title}</DialogTitle>
 <DialogDescription>{description}</DialogDescription>
 </DialogHeader>
 <DialogFooter className="gap-2 sm:justify-end mt-4">
 <Button
 variant="outline"
 onClick={() => setOpen(false)}
 disabled={isDeleting}
 >
 Cancel
 </Button>
 <Button
 variant="destructive"
 onClick={handleConfirm}
 disabled={isDeleting}
 >
 {isDeleting ?"Deleting..." :"Delete"}
 </Button>
 </DialogFooter>
 </DialogContent>
 </Dialog>
 );
}
