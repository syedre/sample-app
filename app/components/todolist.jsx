import React, { useState } from "react";
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

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Learn React",
      description: "Understand the basics of React",
    },
    {
      id: 2,
      text: "Build a To-Do App",
      description: "Create a simple to-do list application",
    },
    {
      id: 3,
      text: "Style with Tailwind CSS",
      description: "Apply Tailwind CSS styles to the app",
    },
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setIsSheetOpen(true);
  };

  const handleSave = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === selectedTodo.id ? selectedTodo : todo
      )
    );
    setIsSheetOpen(false);
  };

  return (
    <div>
      <ItemDemo todos={todos} onEdit={handleEditClick} />

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
                <Label htmlFor="text">Title</Label>
                <Input
                  id="text"
                  value={selectedTodo.text}
                  onChange={(e) =>
                    setSelectedTodo({ ...selectedTodo, text: e.target.value })
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
