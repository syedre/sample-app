"use client";
import React, { useEffect, useState } from "react";

import TodoList from "../components/todolist";
import UserMenu from "../components/userProfile";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

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

  return (
    <div>
      <UserMenu userData={todos[0]} />
      <div className="flex  flex-col   p-24">
        <TodoList
          todos={todos}
          setTodos={setTodos}
          filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
        />
      </div>
    </div>
  );
}
