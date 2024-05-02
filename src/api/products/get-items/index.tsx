import { TFields } from "types/product";
import { api } from "../../instance";
import { TRequest, TResponse } from "./types";
import { removeDuplicateItems } from "lib/remove-dublicate-items";

interface TInput {
  signal: AbortSignal;
  params: TRequest;
  filter: { key: TFields | null; value: string | number | null };
}

export const getItems = async ({ signal, params: { ids }, filter }: TInput) => {
  const response = await api<TRequest, TResponse>({
    action: "get_items",
    params: { ids },
    signal,
  });
  return {
    result: removeDuplicateItems(response.result, filter),
  };
};
