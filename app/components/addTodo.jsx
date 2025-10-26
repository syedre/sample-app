"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const AddTodoDialog = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (name.trim() === "") return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await res.json();
      toast.success("Todo added successfully");

      // Add to state in parent
      onAdd(newTodo);

      // Reset form
      setName("");
      setDescription("");
      setOpen(false);
    } catch (err) {
      console.error("Error adding todo:", err);
      // You can show a toast or error UI here
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Add Todo</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New To-Do</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new to-do.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="todo-name">Title</Label>
            <Input
              id="todo-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter todo title"
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="todo-description">Description</Label>
            <Input
              id="todo-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? <Spinner /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
