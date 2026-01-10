"use client";

interface PaginationProps {
  total: number;
  limit: number;
  offset: number;
  setOffset: (offset: number) => void;
}

export default function Pagination({
  total,
  limit,
  offset,
  setOffset,
}: PaginationProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      {/* Left: Page info */}
      <div className="text-sm text-gray-600">
        Page{" "}
        <span className="font-medium text-gray-900">{currentPage}</span>{" "}
        of{" "}
        <span className="font-medium text-gray-900">{totalPages}</span>
        <span className="ml-2 text-gray-400">
          ({total} total)
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setOffset(offset - limit)}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition
                     hover:bg-gray-100 hover:text-gray-900
                     disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Prev
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setOffset(offset + limit)}
          className="inline-flex items-center rounded-lg border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition
                     hover:bg-indigo-700
                     disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-indigo-400 disabled:border-indigo-400"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
