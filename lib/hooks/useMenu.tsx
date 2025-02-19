import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { MenuItemT } from "../types/menu";
import fetchUrl from "../utils/fetchUrl";

const MENU_ITEMS_CACHE_KEY = "menuItemsCache";

const fetchMenuItems = async (): Promise<MenuItemT[]> => {
  try {
    const response = await fetchUrl<MenuItemT[]>("/menu-items");
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

export const useMenuItems = () => {
  return useQuery<MenuItemT[]>({
    queryKey: ["menuItems"],
    queryFn: fetchMenuItems,
    staleTime: 1000 * 60 * 60, // 1 hour
    // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    // initialData: async () => {
    //   const cachedData = await AsyncStorage.getItem(MENU_ITEMS_CACHE_KEY);
    //   return cachedData ? JSON.parse(cachedData) : undefined;
    // },
  });
};

export const useSelectedMenuItem = () => {
  const queryClient = useQueryClient();
  const key = "selectedMenuItem";

  return useQuery<MenuItemT | null>({
    queryKey: [key],
    queryFn: async () => {
      const cachedMenuItem = queryClient.getQueryData<MenuItemT>([key]);
      if (cachedMenuItem) {
        return cachedMenuItem;
      }

      const storedMenuItem = await AsyncStorage.getItem(key);
      if (storedMenuItem) {
        const menuItem: MenuItemT = JSON.parse(storedMenuItem);
        queryClient.setQueryData([key], menuItem);
        return menuItem;
      }

      return null;
    },
  });
};
