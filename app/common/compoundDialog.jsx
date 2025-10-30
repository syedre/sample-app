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
import { Button } from "@/components/ui/button";

function CompoundDialog({ children, open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
}

function Trigger({ children }) {
  return (
    <DialogTrigger asChild>
      <Button className="mb-4">{children}</Button>
    </DialogTrigger>
  );
}

function Content({ children }) {
  return <DialogContent>{children}</DialogContent>;
}

function Header({ children }) {
  return <DialogHeader>{children}</DialogHeader>;
}

function Title({ children }) {
  return <DialogTitle>{children}</DialogTitle>;
}
function Description({ children }) {
  return <DialogDescription>{children}</DialogDescription>;
}

function Footer({ children }) {
  return <DialogFooter>{children}</DialogFooter>;
}

function Close({ children, loading, onCan }) {
  return (
    <DialogClose asChild>
      <Button variant="outline" disabled={loading} onClick={onCan}>
        Cancel
      </Button>
    </DialogClose>
  );
}

CompoundDialog.Trigger = Trigger;
CompoundDialog.Content = Content;
CompoundDialog.Header = Header;
CompoundDialog.Title = Title;
CompoundDialog.Description = Description;
CompoundDialog.Footer = Footer;
CompoundDialog.Close = Close;

export default CompoundDialog;
