"use client";

import React, { useEffect, useState } from "react";
import { ItemDemo } from "./todoitem";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AddTodoDialog from "./addTodo";
import { toast } from "sonner";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchTodo, setSearchTodo] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setIsSheetOpen(true);
  };

  const handleSave = async () => {
    if (!selectedTodo) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/updatetodo/${selectedTodo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedTodo.name,
            description: selectedTodo.description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();

      // Update the UI with the new todo data from backend
      toast.success("Todo updated successfully");
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === selectedTodo.id ? data.todo : todo
        )
      );

      setIsSheetOpen(false);
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }

      const data = await res.json();
      console.log("Deleted:", data.todo);

      toast.success("Todo deleted successfully");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete todo");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/"; // redirect to login if not logged in
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/listtodos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  useEffect(() => {
    if (searchTodo.trim() === "") {
      setFilteredTodos(todos);
    } else {
      const query = searchTodo.toLowerCase();
      setFilteredTodos(
        todos.filter(
          (todo) =>
            todo.name.toLowerCase().includes(query) ||
            todo.description.toLowerCase().includes(query)
        )
      );
    }
  }, [searchTodo, todos]);

  return (
    <div>
      <AddTodoDialog
        onAdd={(newTodo) => setTodos((prev) => [...prev, newTodo])}
      />

      <Input
        className={"mb-2"}
        placeholder="Search todos..."
        onChange={(e) => setSearchTodo(e.target.value)}
        value={searchTodo}
      />

      <ItemDemo
        todos={filteredTodos}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle>Edit To-Do</SheetTitle>
            <SheetDescription>
              Make changes and click save when you're done.
            </SheetDescription>
          </SheetHeader>

          {selectedTodo && (
            <div className="grid flex-1 auto-rows-min gap-6 px-4 ">
              <div className="grid gap-3">
                <Label htmlFor="name">Title</Label>
                <Input
                  id="name"
                  value={selectedTodo.name}
                  onChange={(e) =>
                    setSelectedTodo({ ...selectedTodo, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={selectedTodo.description}
                  onChange={(e) =>
                    setSelectedTodo({
                      ...selectedTodo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <SheetFooter>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TodoList;
