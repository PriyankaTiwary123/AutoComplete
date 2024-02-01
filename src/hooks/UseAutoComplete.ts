import { useState, useEffect, useCallback } from "react";
import { debounce } from "../utils/debounce";

interface UseAutocompleteOptionsProps {
  api_URL: string;
}

const UseAutocomplete = ({ api_URL }: UseAutocompleteOptionsProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let abortController = new AbortController();// using this to abort the api call when clearing the input text at once

  const fetchData = async (inputVal: string) => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetch(`${api_URL}?q=${inputVal}`, {
        signal: abortController.signal,
      });

      if (response.ok) {
        const data = await response.json();
        setFilteredSuggestions(
          data.filter((suggestion: Record<string, string>) =>
            suggestion.name.toLowerCase().startsWith(inputVal.toLowerCase())
          )
        );
        setLoading(false);
      } else {
        setError("Error fetching suggestions");
      }
    } catch (error) {
      setError("Error fetching suggestions");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((inputVal: string) => {
      fetchData(inputVal);
    }, 500),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value;
    setInputValue(currentInputValue);
    abortController.abort(); // Abort the previous fetch if still ongoing
    const newAbortController = new AbortController();
    abortController = newAbortController;

    debouncedFetchData(currentInputValue);
  };

  const handleSuggestionClick = (suggestion: Record<string, string>) => {
    const trimmedInputValue = (suggestion?.name ?? "").trim();
    setInputValue(trimmedInputValue);
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

  useEffect(() => {
    return () => {
      abortController.abort(); //Abort ongoing fetch when the component unmounts//
    };
  }, []);



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
