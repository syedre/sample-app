"use client";

import { LogOut, Panda, Pencil, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import UploadPage from "./imageUploader";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import CommonDialog from "./commonDialog";

export default function UserMenu({ userData, setUser }) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(userData?.user_name);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect to login
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", newName);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUser({
          ...userData,
          user_name: data?.user?.name,
          user_image: data?.user?.image_url,
        });
        toast.success("Profile updated successfully");
      } else {
        toast.error("❌ Upload failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading file");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    setOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* <Panda className="h-8 w-8 text-black" /> */}
        <div></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer ">
              <Avatar>
                <AvatarImage
                  src={userData?.user_image}
                  alt={userData?.user_name}
                />
                <AvatarFallback>{"R"}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mt-2">
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span className="capitalize">{userData?.user_name}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpen(true)} icon={<Pencil />}>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
