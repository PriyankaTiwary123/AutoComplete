import React from "react";
import UseAutocomplete from "../hooks/UseAutoComplete";
import FilteredList from "./FilteredList";

interface AutocompleteProps {
  api_URL: string;
  searchCategory: string;
}
const Autocomplete: React.FC<AutocompleteProps> = ({
  api_URL,
  searchCategory,
}) => {
  const {
    inputValue,
    filteredSuggestions,
    loading,
    error,
    handleInputChange,
    handleSuggestionClick,
    handleKeyDown,
    focusedIndex,
  } = UseAutocomplete({ api_URL });

  return (
    <div className="relative">
      <label htmlFor="autocomplete-input">{`Search ${searchCategory}`}</label>
      <input
        className="w-full p-3 mt-5 border border-gray-300 rounded-md focus:outline-none focus:border-gray-300"
        id="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search Dog Breed..."
      />
      <FilteredList
        loading={loading}
        error={error}
        inputValue={inputValue}
        focusedIndex={focusedIndex}
        filteredSuggestions={filteredSuggestions}
        onSuggestedListClick={handleSuggestionClick}
      />
    </div>
  );
};

export default Autocomplete;
