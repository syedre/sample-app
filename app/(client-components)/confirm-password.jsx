import React, { useState } from "react";
import InputLabel from "../common/inputLabel";
import { confirmPassword } from "../utils/authentication";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const ConfirmPassword = ({
  token,
  loading,
  setloading,
  SetResetToken,
  setStep,
}) => {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await confirmPassword(password, token);
      const data = await res.json();
      if (data && data?.success === true) {
        SetResetToken(null);
        setStep(4);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <InputLabel
        handleInput={handleChange}
        loading={loading}
        title={"confirm password"}
        value={password}
        required={true}
        type="password"
      />
      <Button
        onClick={handleSubmit}
        type="submit"
        disabled={password?.length === 0}
      >
        {loading ? <Spinner /> : "Submit"}
      </Button>
    </>
  );
};

export default ConfirmPassword;
