"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CardDemo from "./components/login";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {message &&
              message.map((msg, index) => (
                <SelectItem value={msg.id} key={index}>
                  {msg.email}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
