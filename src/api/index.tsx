import { ApiError } from "../lib/errors/api-error";
import { getAuthPassword } from "../lib/get-auth-password";

type API_ACTION = "get_ids" | "get_fields" | "get_items" | "filter";

export const api = async <TRequest, TResponse>({
  action,
  params,
  signal,
}: {
  action: API_ACTION;
  params: TRequest;
  signal: AbortSignal;
}): Promise<TResponse> => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_API_URI as string,
      {
        signal,
        method: "POST",
        headers: {
          "X-Auth": getAuthPassword(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          params,
        }),
      }
    );
    if (response.status === 500) {
      const id = await response.text();
      return Promise.reject(ApiError.Internal(id));
    }
    if (response.status === 400) {
      return Promise.reject(ApiError.BadRequest("Ошибка получения данных"));
    }
    if (response.status === 401) {
      return Promise.reject(ApiError.Unauthorized());
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    else throw new Error("Произошла непредвиденная ошибка");
  }
};
