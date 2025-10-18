"use client";
import { Button } from "@/components/ui/button";
import TodoList from "../components/todolist";
import UserMenu from "../components/userProfile";

export default function TodosPage() {
  return (
    <div>
      <UserMenu />
      <div className="flex  flex-col   p-24">
        <TodoList />
      </div>
    </div>
  );
}
