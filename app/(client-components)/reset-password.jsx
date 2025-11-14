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
import { reset } from "../utils/authentication";
import ParentOtp, { InputOTPPattern } from "./otp";
import ConfirmPassword from "./confirm-password";

const ResetCard = () => {
  const [loading, setloading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const [resetToken, SetResetToken] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await reset(email);
      const data = await response.json();
      if (data?.success === false) {
        throw new Error(data?.message);
      }
      setStep(2);
    } catch ({ message }) {
      setErr(message);
    } finally {
      console.log("entered finally");
      setloading(false);
    }
  };

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
            {step == 1 && (
              <>
                <InputLabel
                  handleInput={handleChange}
                  loading={false}
                  title={"confirm email"}
                  value={email}
                  required={true}
                />
                {err && err !== null && (
                  <span className="text-red-400 ">{err}</span>
                )}
              </>
            )}
            {step === 2 && (
              <ParentOtp setStep={setStep} SetResetToken={SetResetToken} />
            )}
            {step === 3 && (
              <ConfirmPassword
                token={resetToken}
                loading={loading}
                setloading={setloading}
                SetResetToken={SetResetToken}
                setStep={setStep}
              />
            )}
            {step === 4 && (
              <p className="text-green-400">
                ✅Password has been Updated Successfully
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-4">
          {step === 1 && (
            <Button type="submit" className="w-full">
              {loading ? <Spinner /> : "Submit"}
            </Button>
          )}
        </CardFooter>
      </form>
      <div className="flex justify-between px-3">
        <Button
          variant={"link"}
          className=""
          onClick={() => {
            if (step === 4) {
              router.push("/");
            } else {
              router.push("/signup");
            }
          }}
        >
          {step === 4 ? "Login" : "Sign Up"}
        </Button>
      </div>
    </Card>
  );
};

export default ResetCard;
