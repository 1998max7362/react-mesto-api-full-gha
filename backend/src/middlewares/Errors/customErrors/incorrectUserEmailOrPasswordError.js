export default class IncorrectUserEmailOrPasswordError extends Error {
  constructor() {
    super("");
    this.name = "incorrectUserEmailOrPassword";
    this.message = "Неправильные почта или пароль";
    this.statusCode = 401;
  }
}
