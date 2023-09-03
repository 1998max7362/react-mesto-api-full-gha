export default class NotAuthorizedError extends Error {
  constructor() {
    super("");
    this.name = "NotAuthorized";
    this.message = "Необходима авторизация";
    this.statusCode = 401;
  }
}
