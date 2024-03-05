import { TProduct } from "../../../types/product";

export type TRequest = {
  ids: string[];
};
export type TResponse = {
  result: TProduct[];
};
