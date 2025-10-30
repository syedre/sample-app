"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { postTodo } from "../apis/todos";
import CompoundDialog from "../common/compoundDialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const AddTodoDialog = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (name.trim() === "") return;
    setLoading(true);
    try {
      const res = await postTodo(name, description);
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
    <CompoundDialog open={open} setOpen={setOpen}>
      <CompoundDialog.Trigger>Add Todo</CompoundDialog.Trigger>
      <CompoundDialog.Content>
        <CompoundDialog.Header>
          <CompoundDialog.Title>Add a new Todo</CompoundDialog.Title>
          <CompoundDialog.Description>
            Fill out the form to create a new to-do.
          </CompoundDialog.Description>
        </CompoundDialog.Header>

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

        <CompoundDialog.Footer>
          <CompoundDialog.Close loading={loading}></CompoundDialog.Close>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? <Spinner /> : "Save"}
          </Button>
        </CompoundDialog.Footer>
      </CompoundDialog.Content>
    </CompoundDialog>
  );
};

export default AddTodoDialog;
