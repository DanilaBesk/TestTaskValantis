import { TFields } from "../../../types/product";

export type TRequest = Record<string, number | string | null>;

export type TResponse = {
  result: string[];
};
