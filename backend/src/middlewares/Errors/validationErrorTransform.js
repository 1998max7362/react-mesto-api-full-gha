/* eslint-disable no-param-reassign */
const validationErrorTransform = (err) => {
  const pathsErrors = Object.keys(err.errors);
  err.statusCode = 400;
  err.message = `Переданы некорректные данные в полях ${pathsErrors.join(", ")}`;
};

export default validationErrorTransform;
