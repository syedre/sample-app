"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { login, signup } from "../apis/authentication";

export default function SignupCard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await signup(name, email, password);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        // setLoading(false);
        return;
      }

      // ✅ if your backend returns token after signup
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/todos");
      } else {
        // if backend only returns message, then manually login after signup
        const loginRes = login(email, password);
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem("token", loginData.token);
          router.push("/todos");
        } else {
          setError("Signup success, but login failed. Please try logging in.");
        }
      }

      setSuccess("Signup successful! Redirecting...");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1  bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
      <div className="flex-1 flex items-center justify-center w-full">
        <form onSubmit={handleSignup} className="w-full flex justify-center">
          <Card className="w-[70%] ">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your details to sign up and get started
              </CardDescription>
              <CardAction>
                <Button variant="link" onClick={() => router.push("/")}>
                  Back to Login
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm mt-2 text-center">
                  {success}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full " disabled={loading}>
                {loading ? <Spinner /> : "Sign Up"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
