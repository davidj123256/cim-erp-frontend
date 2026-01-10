"use client";

interface ContactFiltersProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function ContactFilters({
  search,
  setSearch,
}: ContactFiltersProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      {/* Search input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search by name, email, or mobile…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900
                     placeholder:text-gray-400
                     focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />

        {/* Optional search icon */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Clear button */}
      <button
        onClick={() => setSearch("")}
        disabled={!search}
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition
                   hover:bg-gray-100 hover:text-gray-900
                   disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear
      </button>
    </div>
  );
}
