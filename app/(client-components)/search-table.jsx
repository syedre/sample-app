"use client";

import React from "react";

const SearchTable = ({ table }) => {
  return (
    <div>
      {table?.map((i, inx) => (
        <div key={inx}>{i}</div>
      ))}
    </div>
  );
};

export default SearchTable;
