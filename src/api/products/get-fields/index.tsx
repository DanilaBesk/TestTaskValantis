import { api } from "../../instance";
import { TRequest, TResponse } from "./types";

interface TInput {
  signal: AbortSignal;
  params?: TRequest;
}

export const getFields = ({ params, signal }: TInput) => {
  return api<TRequest, TResponse>({
    action: "get_fields",
    params: {
      field: params?.field,
      limit: params?.limit,
      offset: params?.offset,
    },
    signal,
  });
};
