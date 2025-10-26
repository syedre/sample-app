"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const CommonSheet = ({
  children,
  open,
  setIsSheetOpen,
  loading,
  handleSave,
}) => {
  return (
    <Sheet open={open} onOpenChange={setIsSheetOpen}>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Edit To-Do</SheetTitle>
          <SheetDescription>
            Make changes and click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <Button type="submit" disabled={loading} onClick={handleSave}>
            {loading ? <Spinner /> : "Save"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CommonSheet;
