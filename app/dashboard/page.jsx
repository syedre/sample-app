"use server";
import React, { Suspense } from "react";
import SearchTable from "@/app/(client-components)/search-table";

async function DashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch failed: ${res.status} ${text}`);
  }
  const data = await res.json();

  return (
    <div>
      <h1 className="font-bold">Tables</h1>
      <Suspense fallback={<div>loading</div>}>
        <SearchTable table={data} />
      </Suspense>
    </div>
  );
}
export default DashboardPage;
