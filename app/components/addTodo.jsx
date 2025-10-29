"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CommonDialog from "../common/commonDialog";
import { postTodo } from "../apis/todos";

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
    <CommonDialog
      handleSubmit={handleAdd}
      loading={loading}
      open={open}
      setOpen={setOpen}
      isTrigger={true}
      title="Add New To-Do"
    >
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
    </CommonDialog>
  );
};

export default AddTodoDialog;
