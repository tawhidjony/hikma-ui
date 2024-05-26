import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import UiButton from '.';


describe("Button component", () => {
  it('renders button with text and responds to click events', () => {
    const handleClick = jest.fn();

    render(<UiButton onClick={handleClick}>Click Me</UiButton>);

    // Find the button element
    const buttonElement = screen.getByText(/click me/i);

    // Verify the button is in the document
    expect(buttonElement).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(buttonElement);

    // Verify the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the correct styling", () => {
    
    const handleClick = jest.fn();
    const children = "Click Me";
    const { getByTestId } = render(<UiButton onClick={handleClick} >{children}</UiButton>);

    // Act
    const container = getByTestId("page-container");

    // Assert
    expect(container).toHaveStyle(`
    background-color: #f5f5f5;
    `);
  });

})
