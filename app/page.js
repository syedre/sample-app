import Image from "next/image";
import CardDemo from "./components/login";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <CardDemo />
    </div>
  );
}
