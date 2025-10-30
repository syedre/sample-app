import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const InputLabel = ({ value, loading, title, handleInput }) => {
  return (
    <>
      <Label htmlFor={title} className="capitalize">
        {title}
      </Label>
      <Input
        id={title}
        value={value}
        onChange={handleInput}
        placeholder={`Enter todo ${title}`}
        disabled={loading}
      />
    </>
  );
};

export default InputLabel;
