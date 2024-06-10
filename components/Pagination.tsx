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

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  // console.log(pages);
  // console.log(currentPage, totalPages);

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {"<"}
      </button>
      {pages.length > 0 &&
        pages.map((i) => (
          <div
            key={i}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 font-bold ${
              currentPage === i ? "bg-[--btn1] text-white" : ""
            } hover:bg-[--btn1] hover:text-white`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </div>
        ))}
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
