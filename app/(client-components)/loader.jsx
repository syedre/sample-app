import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Loader2 className="animate-spin text-primary w-10 h-10" />
    </div>
  );
}
