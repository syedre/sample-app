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
import { login } from "@/app/utils/authentication";
import { Login_Form } from "@/app/constants/forms";
import { useForm, Controller } from "react-hook-form";
import FormInputLabel from "../common/FormInputLabel";

export default function CardDemo() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await login(email, password);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message);
      }

      localStorage.setItem("token", data.token);
      router.push("/todos");
    } catch (error) {
      setError("root", {
        message: error?.message,
      });
    }
  };

  return (
    <Card className="w-[70%]">
      <form onSubmit={handleSubmit(formSubmit)}>
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

        <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Login"}
          </Button>
        </CardFooter>
      </form>
      <div className="flex justify-between px-3">
        <Button
          variant={"link"}
          className=" text-red-500"
          onClick={() => router.push("/forgot-password")}
        >
          Forgot Password
        </Button>
        <Button
          variant={"link"}
          className=""
          onClick={() => router.push("/signup")}
        >
          Sign up
        </Button>
      </div>
    </Card>
  );
}
