"use client";

import { useState } from "react";
import { toast } from "sonner"; // or your toast library
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CommonDropdown from "@/app/common/commonDropdown";
import CommonDialog from "@/app/common/commonDialog";
import UploadPage from "@/app/components/imageUploader";

export default function TodoMenu({ userData: initialUserData }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [newName, setNewName] = useState(initialUserData?.user_name || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleSave = async () => {
    if (!newName && !file) return toast.error("No changes made");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", newName);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ update local user data
        const updatedUser = {
          ...userData,
          user_name: data?.user?.name,
          user_image: data?.user?.image_url,
        };
        setUserData(updatedUser);

        toast.success("Profile updated successfully");
      } else {
        toast.error("❌ Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div></div>

        <CommonDropdown
          handleLogout={handleLogout}
          setOpen={setOpen}
          userData={userData}
        />

        <CommonDialog
          handleSubmit={handleSave}
          loading={loading}
          open={open}
          setOpen={setOpen}
          title="Update Profile"
        >
          <div className="flex flex-col gap-4">
            <UploadPage url={userData?.user_image} setFile={setFile} />
            <div>
              <Label htmlFor="name" className="mb-2">
                User Name
              </Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </div>
        </CommonDialog>
      </div>
    </header>
  );
}
