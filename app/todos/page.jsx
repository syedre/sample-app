"use server";
import React from "react";
import { serverTodos } from "../utils/server-todo";
import UserTodos from "../(client-components)/user-todos";
import TodoMenu from "../(client-components)/user-menu";

export default async function TodosPage() {
  const data = await serverTodos();
  const user_todos = data?.todos;
  const userName = data?.user;

  return (
    <div className="min-h-screen">
      <TodoMenu userData={userName} />
      <div className="flex flex-col h-[calc(100vh-65px)]">
        <div className="flex-1 overflow-y-auto  scrollbar-hide h-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-6">
            <div className="sm:col-span-1 md:col-span-2 md:col-start-3">
              <UserTodos data={user_todos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
