"use client";
import React, { use, useEffect, useState } from "react";

import TodoList from "../components/todolist";
import UserMenu from "../components/userProfile";
import { listTodos } from "../utils/todos";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await listTodos();
        setTodos(data?.todos);
        setFilteredTodos(data?.todos);
        setUserData(data?.user);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {userData && userData?.user_name && (
        <UserMenu userData={userData} setUser={setUserData} />
      )}

      {/* Body area */}
      <div className="flex flex-col h-[calc(100vh-65px)]">
        <div className="flex-1 overflow-y-auto  scrollbar-hide h-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-6">
            <div className="sm:col-span-1 md:col-span-2 md:col-start-3">
              <TodoList
                todos={todos}
                setTodos={setTodos}
                filteredTodos={filteredTodos}
                setFilteredTodos={setFilteredTodos}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
