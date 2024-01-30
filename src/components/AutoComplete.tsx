import React from "react";
import UseAutocomplete from "../hooks/UseAutoComplete";
import FilteredList from "./FilteredList";

interface AutocompleteProps {
  api_URL: string;
}
const Autocomplete: React.FC<AutocompleteProps> = ({ api_URL }) => {
  const {
    inputValue,
    filteredSuggestions,
    loading,
    error,
    handleInputChange,
    handleSuggestionClick,
  } = UseAutocomplete({ api_URL });

  return (
    <div className="mx-auto mt-8">
      <input
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-300"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search Dog Breed..."
      />
      <FilteredList
        loading={loading}
        error={error}
        inputValue={inputValue}
        filteredSuggestions={filteredSuggestions}
        onSuggestedListClick={handleSuggestionClick}
      />
    </div>
  );
};

export default Autocomplete;
