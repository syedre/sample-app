"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { postTodo } from "../utils/todos";
import CompoundDialog from "../common/compoundDialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import InputLabel from "../common/inputLabel";

const AddTodoDialog = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({ name: "", description: "" });

  const handleAdd = async () => {
    const { name, description } = formdata;
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
      setFormdata({
        name: "",
        description: "",
      });
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

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormdata((prev) => ({ ...prev, [id]: value }));
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
            <InputLabel
              handleInput={handleInput}
              loading={loading}
              value={formdata.name}
              title={"name"}
            />
          </div>
          <div className="grid gap-2">
            <InputLabel
              handleInput={handleInput}
              loading={loading}
              value={formdata.description}
              title={"description"}
            />
          </div>
        </div>

        <CompoundDialog.Footer>
          <CompoundDialog.Close
            loading={loading}
            onCan={() =>
              setFormdata({
                name: "",
                description: "",
              })
            }
          ></CompoundDialog.Close>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? <Spinner /> : "Save"}
          </Button>
        </CompoundDialog.Footer>
      </CompoundDialog.Content>
    </CompoundDialog>
  );
};

export default AddTodoDialog;
