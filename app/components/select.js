import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectEmail = ({ message }) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {message &&
          message.map((msg, index) => (
            <SelectItem value={msg.id} key={index}>
              {msg.email}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectEmail;
