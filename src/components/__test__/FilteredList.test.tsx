import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilteredList from "../FilteredList";

describe("FilteredList Component", () => {
  const mockSuggestions = [
    { name: "Labrador Retriever" },
    { name: "Golden Retriever" },
    { name: "German Shepherd" },
  ];

  it("renders filtered suggestions with highlighted match", () => {
    render(
      <FilteredList
        loading={false}
        error={null}
        focusedIndex={1}
        isNoData={false}
        filteredSuggestions={mockSuggestions}
        inputValue="retriever"
        onSuggestedListClick={() => {}}
      />
    );

    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.queryByText("Error Message")).toBeNull();

    const suggestionItems = screen.getAllByRole("listitem");
    expect(suggestionItems).toHaveLength(3);

    expect(suggestionItems[0]).toHaveTextContent("Labrador ");
    expect(
      suggestionItems[0].querySelector(".font-bold.text-blue-500")
    ).toHaveTextContent("Retriever");

    expect(suggestionItems[1]).toHaveTextContent("Golden ");
    expect(
      suggestionItems[1].querySelector(".font-bold.text-blue-500")
    ).toHaveTextContent("Retriever");
  });

  it("handles click on suggested item", () => {
    const mockOnSuggestedListClick = jest.fn();
    render(
      <FilteredList
        loading={false}
        error={null}
        isNoData={false}
        focusedIndex={1}
        filteredSuggestions={mockSuggestions}
        inputValue="retriever"
        onSuggestedListClick={mockOnSuggestedListClick}
      />
    );

    userEvent.click(screen.getAllByRole("listitem")[0]);

    expect(mockOnSuggestedListClick).toHaveBeenCalledWith(mockSuggestions[0]);
  });

  it("handles loading state", () => {
    render(
      <FilteredList
        loading={true}
        error={null}
        isNoData={false}
        focusedIndex={1}
        filteredSuggestions={[]}
        inputValue="retriever"
        onSuggestedListClick={() => {}}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles error state", () => {
    const errorMessage = "Error fetching suggestions";
    render(
      <FilteredList
        loading={false}
        error={errorMessage}
        isNoData={false}
        focusedIndex={1}
        filteredSuggestions={[]}
        inputValue="retriever"
        onSuggestedListClick={() => {}}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
