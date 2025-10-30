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
import { login, signup } from "../apis/authentication";
import { Sign_Up_Form } from "../constants/forms";
import InputLabel from "../common/inputLabel";

export default function SignupCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [signUpdata, setSignUpdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignUpdata((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { name, email, password } = signUpdata;

    try {
      const res = await signup(name, email, password);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // ✅ if your backend returns token after signup
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/todos");
      } else {
        // if backend only returns message, then manually login after signup
        const loginRes = await login(email, password);
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
      setSignUpdata({
        name: "",
        email: "",
        password: "",
      });
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
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-6">
                {Sign_Up_Form?.map((data, index) => (
                  <div className="grid gap-2" key={index}>
                    <InputLabel
                      handleInput={handleChange}
                      loading={loading}
                      title={data?.label}
                      value={signUpdata?.[data?.label]}
                      required={true}
                      type={data?.type}
                    />
                  </div>
                ))}
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
            <Button
              variant="link"
              onClick={() => router.push("/")}
              className=" text-blue-500"
            >
              Back to Login
            </Button>
          </Card>
        </form>
      </div>
    </div>
  );
}
