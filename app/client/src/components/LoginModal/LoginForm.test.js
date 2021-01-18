import React from "react";
import { render, screen } from "../../custom-render";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

describe("Login Form", () => {
  it("should render fields", () => {
    render(<LoginForm />);
    expect(screen.getByRole("heading", { name: "log in" })).toBeInTheDocument();
  });
});
