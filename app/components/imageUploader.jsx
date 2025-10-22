"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function UploadPage({ url, setFile }) {
  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(url);

  // trigger hidden file input when avatar is clicked
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // when user picks an image
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  return (
    <div className=" min-w-fit  ">
      {/* Avatar (clickable) */}
      <Label htmlFor="name" className="mb-2">
        Profile Picture
      </Label>
      <div className="relative">
        <div className="absolute top-8 left-9  z-10">
          <Pencil color="grey" />
        </div>
        <Avatar
          onClick={handleAvatarClick}
          className="h-24 w-24  hover:opacity-50 cursor-pointer border"
        >
          <AvatarImage
            src={previewUrl || ""}
            alt="avatar"
            height={96}
            width={96}
          />
          <AvatarFallback>IMG</AvatarFallback>
        </Avatar>
      </div>

      {/* Hidden input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
