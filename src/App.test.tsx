import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/test-utils";
import App from "./App";

test("Welcome To ConstructivIQ", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
  renderWithProviders(<App />);

  const linkElement = screen.getByText("Email");
  expect(linkElement).toBeInTheDocument();
});
