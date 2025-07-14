import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="flex-1 px-4 py-2 rounded-lg bg-[#334155] border border-gray-600 placeholder-gray-400 text-white"
      />
      <button
        onClick={() => {
          setQuery("");
          onSearch("");
        }}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Clear
      </button>
    </div>
  );
}
