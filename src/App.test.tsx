import { render, screen } from "@testing-library/react";
import App from "./App";

test("home page text", () => {
  render(<App />);
  const linkElement = screen.getByText(/ConstructivIQ/i);
  expect(linkElement).toBeInTheDocument();
});
