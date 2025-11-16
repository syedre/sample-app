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
import { login, signup } from "@/app/utils/authentication";
import { Sign_Up_Form } from "@/app/constants/forms";
import InputLabel from "@/app/common/inputLabel";
import { Controller, useForm } from "react-hook-form";
import FormInputLabel from "../common/FormInputLabel";

export default function SignupCard() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (signUpdata) => {
    const { name, email, password } = signUpdata;
    try {
      const res = await signup(name, email, password);
      const data = await res.json();

      if (!res.ok) {
        setError("root", {
          message: data.message,
        });
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
          setError("root", {
            message: loginData.message,
          });
          return;
        }
      }
    } catch (err) {
      console.error("Signup error:", err);

      setError("root", {
        message: "Something went wrong. Try again",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full min-h-screen">
      <div className="hidden sm:block bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
      <div className="flex items-center justify-center w-full">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="w-full flex justify-center"
        >
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
                    <Controller
                      name={data?.label}
                      control={control}
                      rules={data?.rules}
                      render={({ field }) => (
                        <FormInputLabel
                          title={data?.label}
                          type={data?.type}
                          errors={errors}
                          {...field}
                        />
                      )}
                    />
                  </div>
                ))}
              </div>

              {errors?.root && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {errors?.root?.message}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full " disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Sign Up"}
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
