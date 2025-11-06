import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import SLoader from "../(client-components)/suspence-loader";

export const dynamic = "force-dynamic";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: "Data loaded after 4 seconds!" };
}

// This is a Server Component
async function SlowComponent() {
  const data = await getData();
  return <div className="p-4 bg-white rounded shadow">✅ {data.message}</div>;
}

// This is a Server Component (default)
export default function SuspensePage() {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Next.js Suspense Test</h2>
      <div>asasas</div>
      <Suspense fallback={<SLoader />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
