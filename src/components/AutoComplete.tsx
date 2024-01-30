import React, { useEffect, useCallback, useState } from "react";
import { debounce } from "../utils/debounce";
import FilteredList from "./FilteredList";

interface AutocompleteProps {
  apiEndpoint: string;
}
const Autocomplete: React.FC<AutocompleteProps> = ({ apiEndpoint }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(
    debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiEndpoint}?q=${inputValue}`);
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((suggestion: Record<string, string>) =>
            suggestion.name.toLowerCase().startsWith(inputValue.toLowerCase())
          );
          setFilteredSuggestions(filtered);
        } else {
          setError("Error fetching suggestions");
        }
      } catch (error) {
        setError("Error fetching suggestions");
      } finally {
        setLoading(false);
      }
    }, 3000),
    [inputValue, apiEndpoint]
  );

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchSuggestions();
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, fetchSuggestions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

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
        filteredSuggestions={filteredSuggestions}
        onSuggestedListClick = {handleSuggestionClick}
      />
    </div>
  );
};

export default Autocomplete;
