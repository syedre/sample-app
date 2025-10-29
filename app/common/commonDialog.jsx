"use client";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const CommonDialog = ({
  children,
  open,
  setOpen,
  loading,
  handleSubmit,
  isTrigger = false,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isTrigger ? (
        <DialogTrigger asChild>
          <Button className="mb-4">Add Todo</Button>
        </DialogTrigger>
      ) : null}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {isTrigger ? (
            <DialogDescription>
              Fill out the form to create a new to-do.
            </DialogDescription>
          ) : null}
        </DialogHeader>
        {children}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
