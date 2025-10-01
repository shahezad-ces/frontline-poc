import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <nav className="inline-flex items-center space-x-3" aria-label="Pagination">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-blue-700 hover:bg-blue-100 rounded-full disabled:opacity-50"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
              page === currentPage
                ? "bg-blue-700 text-white"
                : "text-blue-700 hover:bg-blue-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-blue-700 hover:bg-blue-100 rounded-full disabled:opacity-50"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
}
