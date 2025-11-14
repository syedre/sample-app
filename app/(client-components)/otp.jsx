"use client";

import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { verifyOtp } from "@/app/utils/authentication";
import { Spinner } from "@/components/ui/spinner";

const ParentOtp = ({ setStep, SetResetToken }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOtp(otp);
      const data = await res.json();
      if (data && data?.message === "success") {
        SetResetToken(data.token);
        setStep(3);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputOTPPattern otp={otp} setOtp={setOtp} />
      <Button
        className=""
        onClick={handleVerifyOtp}
        disabled={
          otp?.length === 6 ? false : true || loading === true ? true : false
        }
      >
        {loading === true ? <Spinner /> : <div>Verify OTP</div>}
      </Button>
    </>
  );
};

function InputOTPPattern({ otp, setOtp }) {
  const handleOtpChange = (value) => {
    setOtp(value);
  };

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

export default ParentOtp;
