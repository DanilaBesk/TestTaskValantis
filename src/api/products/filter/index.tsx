import { api } from "../../instance";
import { TRequest, TResponse } from "./types";

interface TInput {
  signal: AbortSignal;
  params: TRequest;
}

export const filter = async ({ signal, params }: TInput) => {
  const response = await api<TRequest, TResponse>({
    action: "filter",
    params,
    signal,
  });
  return {
    result: [...new Set(response.result)],
  };
};
