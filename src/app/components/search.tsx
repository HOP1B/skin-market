import { useState } from "react";

const items = ["Apple", "Banana", "Cherry", "Grapes", "Mango", "Orange"];

const Search = () => {
  const [query, setQuery] = useState<string>("");

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-3 space-y-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              {item}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default Search;
