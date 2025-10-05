"use client";

import { Pagination } from "@frontline/stories";
import { useState } from "react";

const PaginationWrapper = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="flex items-center justify-end sm:justify-center lg:justify-end">
      <Pagination
        currentPage={page}
        totalPages={13}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default PaginationWrapper;
