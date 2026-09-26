"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

export type SettingItem = {
  id: string;
  value: string;
};

type SettingsDialogProps = {
  title: string;
  description: string;
  items: SettingItem[];
  onAdd: (value: string) => Promise<void>;
  onUpdate: (id: string, value: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  triggerButton: React.ReactNode;
};

export function SettingsDialog({
  title,
  description,
  items,
  onAdd,
  onUpdate,
  onDelete,
  triggerButton,
}: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // State for new items being added
  const [newItems, setNewItems] = useState<{ tempId: number; value: string }[]>(
    [],
  );

  // State for inline editing of existing items
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddNewField = () => {
    setNewItems([...newItems, { tempId: Date.now(), value: "" }]);
  };

  const handleRemoveNewField = (tempId: number) => {
    setNewItems(newItems.filter((item) => item.tempId !== tempId));
  };

  const handleNewFieldValueChange = (tempId: number, val: string) => {
    setNewItems(
      newItems.map((item) =>
        item.tempId === tempId ? { ...item, value: val } : item,
      ),
    );
  };

  const saveNewItems = async () => {
    const validItems = newItems.filter((i) => i.value.trim() !== "");
    if (validItems.length === 0) return;

    startTransition(async () => {
      try {
        for (const item of validItems) {
          await onAdd(item.value);
        }
        setNewItems([]);
        setOpen(false);
        toast.success("Successfully added!");
      } catch (error) {
        toast.error("Failed to add items");
      }
    });
  };

  const startEditing = (item: SettingItem) => {
    setEditingId(item.id);
    setEditValue(item.value);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = async (id: string) => {
    if (editValue.trim() === "") {
      toast.error("Value cannot be empty");
      return;
    }
    startTransition(async () => {
      try {
        await onUpdate(id, editValue);
        setEditingId(null);
        setEditValue("");
        toast.success("Updated successfully");
      } catch (error) {
        toast.error("Failed to update");
      }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          setNewItems([]);
          cancelEditing();
        }
      }}
    >
      <DialogTrigger render={triggerButton as React.ReactElement} />
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 py-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2 group">
                {editingId === item.id ? (
                  <>
                    <Input
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="h-9"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(item.id);
                        if (e.key === "Escape") cancelEditing();
                      }}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => saveEdit(item.id)}
                      disabled={isPending}
                    >
                      <Save className="h-4 w-4 text-primary" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={cancelEditing}
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      readOnly
                      value={item.value}
                      className="h-9 bg-muted/50 cursor-default focus-visible:ring-0"
                    />
                    <div className="flex items-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEditing(item)}
                        disabled={isPending}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        title="Delete Item?"
                        description={`Are you sure you want to delete"${item.value}"? This action cannot be undone.`}
                        onConfirm={() => handleDelete(item.id)}
                        trigger={
                          <Button
                            size="icon"
                            variant="ghost"
                            disabled={isPending}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* New items fields */}
            {newItems.map((newItem) => (
              <div key={newItem.tempId} className="flex items-center gap-2">
                <Input
                  autoFocus
                  placeholder="Enter value..."
                  value={newItem.value}
                  onChange={(e) =>
                    handleNewFieldValueChange(newItem.tempId, e.target.value)
                  }
                  className="h-9 border-primary/50 focus-visible:ring-primary/20"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveNewItems();
                  }}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveNewField(newItem.tempId)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={handleAddNewField}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Field
            </Button>
          </div>
        </ScrollArea>

        {newItems.length > 0 && (
          <DialogFooter>
            <Button
              onClick={saveNewItems}
              disabled={
                isPending || newItems.every((i) => i.value.trim() === "")
              }
              className="w-full sm:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Saving..." : "Save New Items"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
