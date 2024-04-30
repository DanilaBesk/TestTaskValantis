import { api } from "../../instance";
import { TRequest, TResponse } from "./types";

interface TInput {
  signal: AbortSignal;
  params?: TRequest;
}

export const getIds = async ({ signal, params }: TInput) => {
  const response = await api<TRequest, TResponse>({
    action: "get_ids",
    params: { offset: params?.offset, limit: params?.limit },
    signal,
  });
  return {
    result: [...new Set(response.result)],
  };
};
