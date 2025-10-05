import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../Utils/useRestaurantMenu";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const RestaurantMenu = () => {
  const { resID } = useParams();
  const dispatch = useDispatch();

  const resInfo = useRestaurantMenu(resID);

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(
      addItem({
        id: item?.card?.info?.id,
        name: item?.card?.info?.name,
        price:
          (item?.card?.info?.defaultPrice || item?.card?.info?.price) / 100,
        description: item?.card?.info?.description,
        imageId: item?.card?.info?.imageId,
      })
    );
  };

  if (resInfo === null) return <Shimmer />;

  console.log("=== DEBUGGING RESTAURANT MENU ===");
  console.log("resInfo:", resInfo);

  const { name, cuisines, avgRating, cloudinaryImageId, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  console.log("Restaurant Info:", {
    name,
    cuisines,
    avgRating,
    costForTwoMessage,
  });

  // Dynamically find itemCards from any REGULAR card
  const regularCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  let itemCards = [];

  // Search through all REGULAR cards to find the first one with itemCards
  for (let i = 0; i < regularCards.length; i++) {
    const cardData = regularCards[i]?.card?.card;
    if (cardData?.itemCards && cardData.itemCards.length > 0) {
      itemCards = cardData.itemCards;
      console.log(
        `Using itemCards from REGULAR cards[${i}] with ${itemCards.length} items`
      );
      break; // Take the first section with items
    }
  }

  console.log("Final itemCards:", itemCards);

  return (
    <div className="menu p-6 max-w-4xl mx-auto">
      <div className="restaurant-info mb-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {name || "Restaurant Name"}
        </h1>
        <h2 className="text-lg text-gray-600 mb-2">
          {cuisines && Array.isArray(cuisines)
            ? cuisines.join(", ")
            : "Various Cuisines"}
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-yellow-600">
            ⭐ {avgRating || "N/A"}
          </span>
          <span className="text-lg text-green-600 font-medium">
            {costForTwoMessage || "Cost info not available"}
          </span>
        </div>
      </div>

      <div className="menu-items">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Menu Items</h2>
        {itemCards && itemCards.length > 0 ? (
          <div className="space-y-4">
            {itemCards.map((item) => (
              <div
                key={item?.card?.info?.id || Math.random()}
                className="menu-item p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item?.card?.info?.name || "Item name not available"}
                    </h3>
                    <p className="text-lg font-bold text-green-600 mb-2">
                      ₹
                      {(item?.card?.info?.defaultPrice &&
                        item.card.info.defaultPrice / 100) ||
                        (item?.card?.info?.price &&
                          item.card.info.price / 100) ||
                        "Price not available"}
                    </p>
                    {item?.card?.info?.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.card.info.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex flex-col items-center">
                    {item?.card?.info?.imageId && (
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/w_150,h_150,c_fill/${item.card.info.imageId}`}
                        alt={item?.card?.info?.name}
                        className="w-24 h-24 object-cover rounded-lg mb-2"
                      />
                    )}
                    <button
                      onClick={() => handleAddItem(item)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No menu items available
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
