"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CardDemo from "./components/login";
import TodoList from "./components/todolist";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
      <div className="flex-1 flex items-center justify-center">
        <CardDemo />
      </div>
      {/* <TodoList /> */}
    </div>
  );
}
