import Header from "../Header";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../store/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should redner Header Component with a login buttoon", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button");

  expect(loginButton).toBeInTheDocument();
});
