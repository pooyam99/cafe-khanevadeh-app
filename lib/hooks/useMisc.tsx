import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import { MiscItemT } from "../types/menu";
import fetchUrl from "../utils/fetchUrl";

const MENU_ITEMS_CACHE_KEY = "miscItemsCache";

const fetchMiscItems = async (): Promise<MiscItemT[]> => {
  try {
    const response = await fetchUrl<MiscItemT[]>("/misc-items");
    // Cache the fetched data
    await AsyncStorage.setItem(MENU_ITEMS_CACHE_KEY, JSON.stringify(response));
    return response;
  } catch (error) {
    // If fetching fails, try to get data from cache
    const cachedData = await AsyncStorage.getItem(MENU_ITEMS_CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error; // If no cached data, rethrow the error
  }
};

export const useMiscItems = () => {
  return useQuery<MiscItemT[]>({
    queryKey: ["miscItems"],
    queryFn: fetchMiscItems,
    staleTime: 1000 * 60 * 60,
  });
};
