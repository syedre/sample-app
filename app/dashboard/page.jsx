"use server";
import React, { Suspense } from "react";
import SearchTable from "../(client-components)/search-table";

async function DashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/api`);
  const data = await res.json();

  return (
    <>
      <h1 className="font-bold">Tables</h1>
      <Suspense fallback={<div>loading</div>}>
        <SearchTable table={data} />
      </Suspense>
    </>
  );
}
export default DashboardPage;
