import React from "react";
import { Link } from "react-router-dom";
import { CDN_URL } from "../Utils/constants.js";

const RestaurantCard = (props) => {
  const { resData } = props;
  // FIX 2: No longer need optional chaining because our data structure is clean.
  const { cloudinaryImageId, name, cuisines, avgRating } = resData;

  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-300">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
    </div>
  );
};

export default RestaurantCard;
