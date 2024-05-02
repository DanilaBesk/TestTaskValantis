import { TFields, TProduct } from "types/product";

export const removeDuplicateItems = (
  data: TProduct[],
  filter: { key: TFields | null; value: string | number | null }
): TProduct[] => {
  const uniqueIds = new Set<string>();
  const uniqueObjects: TProduct[] = [];

  const shouldIncludeItem = (item: TProduct) => {
    if (!filter.key) {
      return true;
    }
    if (filter.key === "product") {
      if (
        typeof filter.value === "string" &&
        !item[filter.key].toLowerCase().includes(filter.value.toLowerCase())
      ) {
        return false;
      }
    } else if (filter.key === "brand") {
      if (item[filter.key] === null && filter.value !== null) return false;
    } else if (item[filter.key] !== filter.value) {
      return false;
    }

    return true;
  };

  data.forEach((item) => {
    if (!uniqueIds.has(item.id) && shouldIncludeItem(item)) {
      uniqueIds.add(item.id);
      uniqueObjects.push({ ...item });
    }
  });
  return uniqueObjects;
};
