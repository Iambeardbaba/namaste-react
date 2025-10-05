import { isAsyncThunkAction } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";

it("Should render RestaurantCard component with props Data", () => {
  render(<RestaurantCard />);
});
