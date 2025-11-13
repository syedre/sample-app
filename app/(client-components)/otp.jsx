"use client";

import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function InputOTPPattern({ otp, setOtp }) {
  //   const [otp, setOtp] = useState("");

  const handleOtpChange = (value) => {
    setOtp(value);
    console.log("Current OTP:", value);
  };

  const verifyOtp = async (e) => {};

  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      value={otp}
      onChange={handleOtpChange}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

const ParentOtp = ({ setStep }) => {
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = (e) => {
    setStep(2);
  };

  return (
    <>
      <InputOTPPattern otp={otp} setOtp={setOtp} />
      <Button
        className={"w-[50px]"}
        onClick={handleVerifyOtp}
        disabled={otp?.length === 6 ? false : true}
      >
        Verify OTP
      </Button>
    </>
  );
};

export default ParentOtp;
