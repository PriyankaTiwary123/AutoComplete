import React, { useMemo } from "react";

interface FilteredListProps {
  loading: boolean;
  error: string | null;
  filteredSuggestions: any[];
  inputValue: string;
  focusedIndex: number | null;
  onSuggestedListClick: (suggestion: Record<any, string>) => void;
}

const FilteredList: React.FC<FilteredListProps> = ({
  loading,
  error,
  filteredSuggestions,
  inputValue,
  focusedIndex,
  onSuggestedListClick,
}) => {
  const highlightMatch = useMemo(() => {
    const memoizedHighlightMatch = (text: string) => {
      const index = text?.toLowerCase().indexOf(inputValue?.toLowerCase());
      if (index !== -1) {
        return (
          <>
            {text?.substring(0, index)}
            <span className="font-bold text-blue-500">
              {text?.substring(index, index + inputValue.length)}
            </span>
            {text?.substring(index + inputValue.length)}
          </>
        );
      }

      return text;
    };

    return memoizedHighlightMatch;
  }, [inputValue]);

  return (
    <div
      role="listbox"
      aria-labelledby="autocomplete-input"
      data-testid="filteredList"
    >
      {loading && <p className="text-gray-500 mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ul className="mt-2">
        {filteredSuggestions.map((suggestion: any, index: any) => (
          <li
            key={suggestion.id}
            onClick={() => onSuggestedListClick(suggestion)}
            className={`cursor-pointer hover:bg-gray-100 p-2 border-b border-gray-300 ${
              focusedIndex === index ? "bg-gray-100" : ""
            }`}
          >
            {highlightMatch(suggestion.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredList;
