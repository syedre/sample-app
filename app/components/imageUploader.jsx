"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UploadPage({ file, setFile }) {
  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

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
    <div className="max-w-sm mx-auto mt-20 flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-4">Upload Avatar</h1>

      {/* Avatar (clickable) */}
      <div onClick={handleAvatarClick} className="cursor-pointer relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={uploadedUrl || previewUrl || ""} alt="avatar" />
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
