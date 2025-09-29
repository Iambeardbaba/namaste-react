import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { MENU_API } from "../Utils/constants.js";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resID } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_API + resID + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    console.log(json);
    setResInfo(json.data);
  };

  if (resInfo === null) return <Shimmer />;
  const { name, cuisines, avgRating, cloudinaryImageId, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const { itemCards } =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card || {};

  console.log(itemCards);

  return (
    <div className="menu">
      <h1>{name || "Restaurant Name"}</h1>
      <h2>{cuisines && Array.isArray(cuisines) ? cuisines.join(", ") : "Various Cuisines"}</h2>
      <h2>⭐ {avgRating || "N/A"}</h2>
      <h2>{costForTwoMessage || "Cost info not available"}</h2>
      <ul>
        {itemCards && itemCards.length > 0 ? (
          itemCards.map((item) => (
            <li key={item?.card?.info?.id || Math.random()}>
              {item?.card?.info?.name || "Item name not available"} - Rs.
              {(item?.card?.info?.defaultPrice &&
                item.card.info.defaultPrice / 100) ||
                (item?.card?.info?.price && item.card.info.price / 100) ||
                "Price not available"}
            </li>
          ))
        ) : (
          <li>No menu items available</li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
