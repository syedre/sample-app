"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CardDemo from "./components/login";
import TodoList from "./components/todolist";

export default function Home() {
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     .catch((err) => console.error("Error fetching:", err));
  // }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <CardDemo />
      {/* <TodoList /> */}
    </div>
  );
}
