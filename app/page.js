"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CardDemo from "./components/login";
import SelectEmail from "./components/select";

export default function Home() {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <CardDemo />

      <div>{message && <SelectEmail message={message} />}</div>
    </div>
  );
}
