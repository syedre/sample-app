"use client";
import React, { useState } from "react";
import InputLabel from "../common/inputLabel";
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
import { useRouter } from "next/navigation";

const ResetCard = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {};
  return (
    <Card className="w-[70%]">
      <form onSubmit={handleSubmit}>
        <CardHeader className={"pb-4"}>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your email below to change your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <InputLabel
              handleInput={handleChange}
              loading={false}
              title={"confirm email"}
              value={email}
              required={true}
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-full">
            Submit
            {/* {loading ? <Spinner /> : "Submit"} */}
          </Button>
        </CardFooter>
      </form>
      <div className="flex justify-between px-3">
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
};

export default ResetCard;
