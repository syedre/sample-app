"use client";

import React, { use } from "react";

const SearchTable = ({ table }) => {
  //   const data = use(response);
  console.log(table, "_______");
  return (
    <div>
      {table?.map((i, inx) => (
        <div key={inx}>{i}</div>
      ))}
    </div>
  );
};

export default SearchTable;
