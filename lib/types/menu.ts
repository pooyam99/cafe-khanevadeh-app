export type MenuItemT = {
  id: number;
  attributes: {
    title: string;
    description: string | null;
    price: string;
    type: "coffee" | "chocolate" | "food" | "drink";
  };
};
