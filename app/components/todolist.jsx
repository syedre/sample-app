"use client";

import React, { useEffect, useState } from "react";
import { ItemDemo } from "./todoitem";
import { Input } from "@/components/ui/input";
import AddTodoDialog from "./addTodo";
import { toast } from "sonner";
import { updateTodo } from "../apis/todos";
import CommonSheet from "../common/commonSheet";
import InputLabel from "../common/inputLabel";

const TodoList = ({ todos, setTodos, filteredTodos, setFilteredTodos }) => {
  const [searchTodo, setSearchTodo] = useState("");

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setIsSheetOpen(true);
  };

  const handleSave = async () => {
    if (!selectedTodo) return;
    setLoading(true);

    try {
      const response = await updateTodo(
        selectedTodo.id,
        selectedTodo.name,
        selectedTodo.description
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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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

  const handleEditInput = (e) => {
    const { id, value } = e.target;
    setSelectedTodo({ ...selectedTodo, [id]: value });
  };

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
    <React.Fragment>
      <div className="sticky top-0 right-0 left-0 z-50 bg-white pl-2 pt-2 mb-2">
        <AddTodoDialog
          onAdd={(newTodo) => setTodos((prev) => [...prev, newTodo])}
        />

        <Input
          placeholder="Search todos..."
          onChange={(e) => setSearchTodo(e.target.value)}
          value={searchTodo}
        />
      </div>

      <ItemDemo
        todos={filteredTodos}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
      <CommonSheet
        open={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        handleSave={handleSave}
        loading={loading}
      >
        {selectedTodo && (
          <div className="grid flex-1 auto-rows-min gap-6 px-4 ">
            <div className="grid gap-3">
              <InputLabel
                handleInput={handleEditInput}
                loading={loading}
                title={"name"}
                value={selectedTodo.name}
              />
            </div>
            <div className="grid gap-3">
              <InputLabel
                handleInput={handleEditInput}
                loading={loading}
                title={"description"}
                value={selectedTodo.description}
              />
            </div>
          </div>
        )}
      </CommonSheet>
    </React.Fragment>
  );
};

export default TodoList;
