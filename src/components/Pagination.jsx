import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React from "react";

const Pagination = ({
  page,
  setPage,
  totalPages,
  from,
  to,
  totalTasks,
  loading,
}) => {
  return (
    <div>
      {totalTasks && (
        <div className="flex items-center mt-6">
          <button
            className={`flex items-center py-2 mr-2 px-4 ${
              page === 1 || loading ? "bg-gray-500" : "bg-white"
            } text-black cursor-pointer`}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1 || loading}
          >
            <FiChevronLeft /> Prev
          </button>
          <button
            className={`flex items-center py-2 px-4 ${
              page >= totalPages || loading ? "bg-gray-500" : "bg-white"
            } text-black cursor-pointer`}
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages || loading}
          >
            <FiChevronRight /> Next
          </button>
          <span className="ml-4">
            {from}-{to} of {totalTasks}
          </span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
