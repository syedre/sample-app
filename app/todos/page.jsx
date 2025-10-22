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
    <div>
      {userData && userData?.user_name && (
        <UserMenu userData={userData} setUser={setUserData} />
      )}
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
