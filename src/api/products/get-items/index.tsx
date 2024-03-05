import { api } from "../..";
import { removeDuplicateFields } from "../../../lib/remove-dublicates";
import { TRequest, TResponse } from "./types";

interface TInput {
  signal: AbortSignal;
  params: TRequest;
}

export const getItems = async ({ signal, params: { ids } }: TInput) => {
  const response = await api<TRequest, TResponse>({
    action: "get_items",
    params: { ids },
    signal,
  });
  return {
    result: removeDuplicateFields(response.result, "id"),
  };
};
