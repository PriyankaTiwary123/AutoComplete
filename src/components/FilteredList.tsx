import React from "react";

interface FilteredListProps {
  loading: boolean;
  error: string | null;
  filteredSuggestions: any[];
  onSuggestedListClick: (suggestion: string) => void;
}

const FilteredList: React.FC<FilteredListProps> = (props: any) => {
  const { loading, error, filteredSuggestions, onSuggestedListClick } = props;
  return (
    <div>
      {loading && <p className="text-gray-500 mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {filteredSuggestions.length === 0 ? (
        <div>No Data Found</div>
      ) : (
        <ul className="mt-2">
          {filteredSuggestions.map((suggestion: any, index: any) => (
            <li
              key={index}
              onClick={() => onSuggestedListClick(suggestion)}
              className="cursor-pointer hover:bg-gray-100 p-2 border-b border-gray-300"
            >
              {suggestion?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredList;
