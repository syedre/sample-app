import React from "react";

import ResetCard from "@/app/(client-components)/reset-password";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen w-full grid  grid-cols-1  sm:grid-cols-2">
      <div className=" hidden sm:block bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
      <div className=" flex items-center justify-center">
        <ResetCard />
      </div>
    </div>
  );
};

export default ForgotPassword;
