import { TFields } from "types/product";

export const getCorrectInputValueType = (
  key: TFields | null,
  value: string
) => {
  if (key === "price") {
    try {
      return parseInt(value);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  } else if (key === "brand" && value === "") {
    return null;
  }
  return value;
};
