"use client";
import CommonError from "../(client-components)/error";

export default function Error({ error, reset }) {
  return <CommonError error={error} reset={reset} />;
}
