import { TFields } from "types/product";
import { api } from "../../instance";
import { TRequest, TResponse } from "./types";

interface TInput {
  signal: AbortSignal;
  params?: TRequest;
}

export const getFields = async <field extends TFields>({
  params,
  signal,
}: TInput) => {
  const response = await api<TRequest, TResponse<field>>({
    action: "get_fields",
    params: {
      field: params?.field,
      limit: params?.limit,
      offset: params?.offset,
    },
    signal,
  });
  return [...new Set(response.result)];
};
