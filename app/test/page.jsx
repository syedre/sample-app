import React from "react";

export default function TestPage() {
  return (
    // <div className="grid grid-cols-4 gap-4 min-h-screen">
    //   <aside className="col-span-1 bg-gray-200 p-4 overflow-y-auto h-screen scrollbar-hide">
    //     {Array.from({ length: 20 }).map((_, index) => (
    //       <div
    //         key={index}
    //         className="mb-2 p-2 bg-white rounded shadow text-center"
    //       >
    //         Sidebar Item {index + 1}
    //       </div>
    //     ))}
    //   </aside>
    //   <main className="col-span-3  bg-red-200 p-4 ">
    //     <div className="grid grid-cols-2 gap-x-4  grid-rows-4 h-full overflow-auto ">
    //       <div className="bg-amber-200 rounded-2xl col-span-2 ">1</div>
    //       <div className="bg-teal-300 ">2</div>
    //       <div className="bg-teal-400 row-span-3">3</div>
    //       <div className="bg-amber-500 ">4</div>
    //       <div className="bg-amber-600  row-span-2">5</div>
    //       {/* <div className="bg-amber-500 ">6</div> */}
    //     </div>
    //   </main>
    // </div>
    // <div className="flex flex-col min-h-screen">
    //   <header className="fixed top-0 left-0 w-full bg-gray-800 text-white px-4 py-3 z-10">
    //     <h1 className="text-lg font-semibold">Header</h1>
    //   </header>

    //   <div className="flex flex-1 overflow-hidden ">
    //     <aside className="w-50 border-r pt-10 overflow-y-auto ">
    //       {Array.from({ length: 20 }).map((i, index) => (
    //         <div className="p-2" key={index}>
    //           Message of {index}
    //         </div>
    //       ))}
    //     </aside>
    //     <main>main</main>
    //   </div>
    // </div>
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white h-[50px] py-3 sticky top-0 z-10">
        <h1 className="text-lg font-semibold">Header</h1>
      </header>

      {/* Body */}
      <div className="grid grid-cols-[250px_1fr]  h-[calc(100vh-50px)] ">
        {/* Sidebar (scrollable) */}
        <aside className="bg-gray-200 overflow-y-auto scrollbar-hide ">
          <div className="p-4 space-y-2">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="bg-gray-300 p-2 rounded">
                Sidebar item {i + 1}
              </div>
            ))}
          </div>
        </aside>

        {/* Main content (scrollable) */}
        <main className="bg-white overflow-y-auto p-4  ">
          <div className="space-y-4">
            {Array.from({ length: 80 }).map((_, i) => (
              <p key={i} className="border-b pb-2">
                Main content line {i + 1}
              </p>
            ))}
          </div>
        </main>
      </div>
    </div>
    // <div className="h-screen">
    //   <div className="grid  grid-rows-6 grid-flow-col gap-2  h-full">
    //     <div className="bg-red-200 ">1</div>
    //     <div className="bg-red-200  ">2</div>
    //     <div className="bg-red-200 ">3</div>
    //     <div className="bg-red-200 row-span-3 ">4</div>
    //     <div className="bg-red-200 row-span-6 ">5</div>
    //     <div className="bg-red-200  ">6</div>
    //     <div className="bg-red-200 ">7</div>
    //     <div className="bg-red-200 ">8</div>
    //     <div className="bg-red-200 row-span-3 ">9</div>
    //   </div>
    // </div>
  );
}
