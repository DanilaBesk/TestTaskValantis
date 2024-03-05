import { TFields } from "../../../types/product";

export type TRequest = {
  field?: TFields;
  offset?: number;
  limit?: number;
};

export type TResponse = {
  result: (string | number | null)[];
};
