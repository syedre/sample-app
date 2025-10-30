"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { login } from "../apis/authentication";
import InputLabel from "../common/inputLabel";
import { Login_Form } from "../constants/forms";

export default function CardDemo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { email, password } = logindata;
      const res = await login(email, password);
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      await res.json().then((data) => {
        localStorage.setItem("token", data.token);
        router.push("/todos");
      });
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <Card className="w-[70%]">
      <form onSubmit={handleSubmit}>
        <CardHeader className={"pb-4"}>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {Login_Form?.map((data, index) => (
              <div className="grid gap-2" key={index}>
                <InputLabel
                  handleInput={handleLogin}
                  loading={loading}
                  title={data?.label}
                  value={logindata?.[data?.label]}
                  required={true}
                  type={data?.type}
                />
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Login"}
          </Button>
        </CardFooter>
      </form>
      <Button
        variant={"link"}
        className=" text-blue-500"
        onClick={() => router.push("/signup")}
      >
        Sign up
      </Button>
    </Card>
  );
}
