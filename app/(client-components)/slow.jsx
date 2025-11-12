"use client";
import React, { use } from "react";
import { getData } from "../suspense/page";

const GoSlow = () => {
  const data = use(getData());
  console.log(data, "data");
  return <div> ✅ {data?.message}</div>;
};

export default GoSlow;
