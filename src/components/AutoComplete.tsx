import React, { useState } from "react";

interface AutocompleteProps {
  suggestions: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
const {suggestions} = props;

  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
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
        placeholder="Type to search..."
      />
      <ul className="mt-2">
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
