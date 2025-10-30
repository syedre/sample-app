import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const InputLabel = ({
  value,
  loading,
  title,
  handleInput,
  type = "text",
  required = false,
}) => {
  return (
    <>
      <Label htmlFor={title} className="capitalize">
        {title}
      </Label>
      <Input
        type={type}
        id={title}
        value={value}
        onChange={handleInput}
        placeholder={`Enter ${title}`}
        disabled={loading}
        required={required}
      />
    </>
  );
};

export default InputLabel;
