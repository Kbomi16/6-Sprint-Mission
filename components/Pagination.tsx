import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {"<"}
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
}
