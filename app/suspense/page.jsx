import React, { Suspense } from "react";

async function DelayedComponent() {
  // Simulate async work
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return <div>✅ Data loaded after 2 seconds!</div>;
}

export default function SuspensePage() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>Next.js Suspense Test</h2>
      <Suspense fallback={<div>🌀 Loading content...</div>}>
        {/* This component "suspends" because it awaits a promise */}
        <DelayedComponent />
      </Suspense>
    </div>
  );
}
