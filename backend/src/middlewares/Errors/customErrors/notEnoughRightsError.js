export default class NotEnoughRightsError extends Error {
  constructor() {
    super("");
    this.name = "notEnoughRights";
    this.message = "Недостаточно прав для данного действия";
    this.statusCode = 403;
  }
}
