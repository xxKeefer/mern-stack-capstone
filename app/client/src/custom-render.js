import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AuthContext from "./context/AuthContext";
import GlobalState from "./context/GlobalState";
import { ThemeProvider } from "@material-ui/core";
import theme from "./components/App/theme";

const Wrapper = ({ children }) => {
  return (
    <AuthContext>
      <ThemeProvider theme={theme}>
        <GlobalState>
          <MemoryRouter>{children}</MemoryRouter>
        </GlobalState>
      </ThemeProvider>
    </AuthContext>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
