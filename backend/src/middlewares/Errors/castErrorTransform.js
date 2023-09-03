const moderlToErrorMap = {
  user: "Передан некорректный id пользователя",
  card: "Передан некорректный id карточки",
};

const modelToErrorMapper = (modelName) => moderlToErrorMap[modelName];

/* eslint-disable no-param-reassign */
const castErrorTransform = (err) => {
  const { modelName } = err.model;
  err.statusCode = 400;
  err.message = modelToErrorMapper(modelName);
};

export default castErrorTransform;
