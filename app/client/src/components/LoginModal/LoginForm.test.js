import React from "react";
import { render, screen } from "../../custom-render";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import { fireEvent, waitFor } from "@testing-library/react";

describe("Login Form", () => {
  it("should render fields", () => {
    render(<LoginForm />);
    expect(screen.getByRole("heading", { name: "log in" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  it("should not display error when form value is valid", async () => {
    const mockLogin = jest.fn((email, password) => {
      return Promise.resolve({ email, password });
    });
    // render(<LoginForm login={mockLogin} />);

    // fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
    //   target: {
    //     value: "test@mail.com",
    //   },
    // });

    // fireEvent.input(screen.getByLabelText("password"), {
    //   target: {
    //     value: "password",
    //   },
    // });

    // fireEvent.submit(screen.getByRole("button"));

    // await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    // expect(mockLogin).toBeCalledWith("test@mail.com", "password");
    // expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
  });
});
