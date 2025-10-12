"use client";
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SearchIcon, Panda } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen  bg-amber-100">
      <div className="flex justify-between items-center w-full bg-white p-4 shadow-md mb-8">
        <div>
          <Panda className="h-8 w-8 text-black" />
        </div>
        <div>
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
      <p className="text-lg text-center">
        This is the landing page. Please navigate to the login page to access
        your account.
      </p>
    </div>
  );
};

export default LandingPage;
