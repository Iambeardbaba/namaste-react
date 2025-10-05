import { useState, useEffect } from "react";
import { MENU_API } from "../Utils/constants.js";

const useRestaurantMenu = (resID) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resID);
      const json = await data.json();
      
      console.log("Fetched data for restaurant:", resID);
      
      setResInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setResInfo(null);
    }
  };  return resInfo;
};

export default useRestaurantMenu;
