import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link href={"/"}>
        <Button variant={"link"} className="mt-4 text-blue-500 underline">
          Go back home
        </Button>
      </Link>
    </div>
  );
}
