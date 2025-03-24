import { Item } from "@prisma/client";

export const formatItem = (item: Item) => {
  return item.split("_").join(" ");
};
