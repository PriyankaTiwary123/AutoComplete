import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Autocomplete from "./components/AutoComplete";
import App from "./App";

jest.mock("./components/AutoComplete", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    inputValue: "",
    filteredSuggestions: [],
    loading: false,
    error: null,
    searchCategory: "",
    handleInputChange: jest.fn(),
    handleSuggestionClick: jest.fn(),
  })),
}));

describe("App Component", () => {
  it("renders App component with Autocomplete", () => {
    render(<App />);
    expect(screen.getByText("AutoComplete Search")).toBeInTheDocument();
    expect(Autocomplete).toHaveBeenCalled();
  });
});
