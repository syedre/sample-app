"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { AlertCircle } from "lucide-react";

export default function CommonError({ error, reset }) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
      <AlertCircle className="w-12 h-12 text-destructive" />
      <h2 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="text-muted-foreground max-w-sm">
        {error?.message ||
          "An unexpected error occurred while loading this page."}
      </p>
      <Button onClick={() => reset()} variant="default" className="mt-2">
        Try again
      </Button>
    </div>
  );
}
