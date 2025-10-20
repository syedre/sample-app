"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UploadPage() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [message, setMessage] = useState("");

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
      handleUpload(selected); // auto-upload after selecting
    }
  };

  // upload logic
  const handleUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data, "data-------");

      if (res.ok) {
        setMessage("✅ ");

        setUploadedUrl(data?.imageUrl);
      } else {
        setMessage("❌ Upload failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading file");
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
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">
          Change
        </div>
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
