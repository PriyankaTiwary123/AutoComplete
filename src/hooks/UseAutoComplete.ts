import { useState, useEffect, useCallback } from "react";
import { debounce } from "../utils/debounce";

interface UseAutocompleteOptionsProps {
  api_URL: string;
}
const UseAutocomplete = ({ api_URL }: UseAutocompleteOptionsProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedVal, setSelectedVal] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fethchData = useCallback(
    debounce(async (inputVal: String) => {
      setError(null);
      try {
        setLoading(true);
        const response = inputVal && (await fetch(`${api_URL}?q=${inputVal}`));
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((suggestion: Record<string, string>) =>
            suggestion.name.toLowerCase().startsWith(inputVal.toLowerCase())
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
    }, 500),
    [api_URL]
  );

  useEffect(() => {
    if (inputValue.trim() !== "" && selectedVal !== inputValue) {
      fethchData(inputValue);
    } else {
      setFilteredSuggestions([]);
      setLoading(false);
      setError(null);
    }
  }, [inputValue]);

  useEffect(() => {
    return () => {
      // Cleanup function to reset state when component unmounts
      setFilteredSuggestions([]);
      setLoading(false);
      setError(null);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(() => inputValue);
  };

  const handleSuggestionClick = (suggestion: Record<any, string>) => {
    const trimmedInputValue = (suggestion?.name ?? "").trim();
    setInputValue(trimmedInputValue);
    setSelectedVal(trimmedInputValue);
    setFilteredSuggestions([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === filteredSuggestions.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? filteredSuggestions.length - 1
          : prevIndex - 1
      );
    } else if (event.key === "Enter") {
      if (focusedIndex !== null) {
        handleSuggestionClick(filteredSuggestions[focusedIndex]);
      }
    }
  };

  return {
    inputValue,
    filteredSuggestions,
    loading,
    error,
    focusedIndex,
    handleInputChange,
    handleSuggestionClick,
    handleKeyDown,
  };
};

export default UseAutocomplete;
