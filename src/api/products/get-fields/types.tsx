import { TFields } from "../../../types/product";

export type TRequest = {
  field?: TFields;
  offset?: number;
  limit?: number;
};

type f = {
  brand: string | null;
  product: string;
  price: number;
};
export type TResponse<T extends TFields> = {
  result: f[T][];
};
