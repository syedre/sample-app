"use client";
import React, { useEffect, useState } from "react";

import TodoList from "../components/todolist";
import UserMenu from "../components/userProfile";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [userData, setUserData] = useState(null);

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
        setTodos(data?.todos);
        setFilteredTodos(data?.todos);
        setUserData(data?.user);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="min-h-screen">
      {userData && userData?.user_name && (
        <UserMenu userData={userData} setUser={setUserData} />
      )}

      {/* Body area */}
      <div className="flex flex-col h-[calc(100vh-65px)]">
        <div className="flex-1 overflow-y-auto  scrollbar-hide h-full">
          <TodoList
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
            setFilteredTodos={setFilteredTodos}
          />
        </div>
      </div>
    </div>
  );
}
