import { useState, useEffect, useCallback } from "react";
import { debounce } from "../utils/debounce";

interface UseAutocompleteOptionsProps {
  api_URL: string;
}
const UseAutocomplete = ({api_URL}: UseAutocompleteOptionsProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(
    debounce(async (inputVal: String) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${api_URL}?q=${inputVal}`);
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
    [api_URL]
  );

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchSuggestions(inputValue);
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return {
    inputValue,
    filteredSuggestions,
    loading,
    error,
    handleInputChange,
    handleSuggestionClick,
  };
};

export default UseAutocomplete;
