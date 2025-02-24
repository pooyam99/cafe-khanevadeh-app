export type MenuItemType = "coffee" | "chocolate" | "food" | "drink";

export interface MenuItemT {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: string;
    type: MenuItemType;
  };
}

export interface MiscItemT {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: string;
  };
}
