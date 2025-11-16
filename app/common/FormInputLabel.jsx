import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const FormInputLabel = ({ title, type = "text", errors, ...rest }) => {
  return (
    <>
      <Label htmlFor={title} className="capitalize">
        {title}
      </Label>
      <Input type={type} {...rest} />
      {errors?.[title] && (
        <p className="text-red-500 text-sm">{errors?.[title]?.message}</p>
      )}
    </>
  );
};

export default FormInputLabel;
