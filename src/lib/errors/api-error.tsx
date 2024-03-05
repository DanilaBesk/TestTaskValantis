export class ApiError extends Error {
  status: number;
  id?: string;

  constructor(status: number, message: string, id?: string) {
    super(message);
    this.status = status;
    this.id = id;
  }
  static BadRequest(message: string) {
    return new ApiError(400, message);
  }
  static Unauthorized() {
    return new ApiError(401, "Ошибка авторизации");
  }
  static Internal(id: string) {
    return new ApiError(500, "Ошибка сервера", id);
  }
}
