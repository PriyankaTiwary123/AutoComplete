import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Autocomplete from "../AutoComplete";
import * as UseAutocompleteModule from "../../hooks/UseAutoComplete";

jest.mock("../../hooks/UseAutoComplete");

describe("Autocomplete Component", () => {
  it("renders Autocomplete component with input and FilteredList", () => {
    const mockUseAutocomplete = jest.spyOn(UseAutocompleteModule, "default");
    mockUseAutocomplete.mockReturnValue({
      inputValue: "Labrador",
      filteredSuggestions: ["Labrador Retriever", "Labrador Mix"],
      loading: false,
      error: null,
      handleInputChange: jest.fn(),
      handleSuggestionClick: jest.fn(),
    });

    render(
      <Autocomplete
        api_URL="https://api.thedogapi.com/v1/breeds/search"
        searchCategory="Dog Breed"
      />
    );
    expect(screen.getByLabelText("Search Dog Breed")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type to search Dog Breed...")
    ).toHaveValue("Labrador");
    expect(screen.getByTestId("filteredList")).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText(
      "Type to search Dog Breed..."
    );
    fireEvent.change(inputElement, { target: { value: "German Shepherd" } });
  });
});
