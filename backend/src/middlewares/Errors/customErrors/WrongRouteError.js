export default class WrongRouteError extends Error {
  constructor() {
    super("");
    this.name = "WrongRouteError";
    this.message = "Страница не найдена";
    this.statusCode = 404;
  }
}
