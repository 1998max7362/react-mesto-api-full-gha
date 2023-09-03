import validationErrorTransform from "./validationErrorTransform.js";
import castErrorTransform from "./castErrorTransform.js";
import error11000Transform from "./error11000Transform.js";

// В ревью было сказано, что для подобных ошибок стоит делать проверку в
// самом контроллере и там вызывать уже кастомную ошибку.
// Мне показалось, что это как будто бы много лишнего кода.
// Так как ошибки валидации и ошибки cast нужно проверять действительно
// во многих контроллерах. Поэтому данный код решил добавить в сам обработчик ошибок
// Не уверен, что это правильно, но такой вариант позволит
// в будуещем не замарачиваться ValidationError и CastError
// так как они сами будут везде обрабатываться.
// В ином случае при добавлении каждого почти нового контроллера,
// где есть обращение к данным с БД,
// В него надо будет добавлять код проверки на эти ошибки.
const errorPreHandler = (err) => {
  if (err.name === "ValidationError") {
    validationErrorTransform(err);
    return;
  }
  if (err.name === "CastError") {
    castErrorTransform(err);
    return;
  }
  if (err.code === 11000) {
    error11000Transform(err);
  }
};

// Тут нужен next, чтобы первым параметров была ошибка
// Если убрать next, то в переменную err кладется req, в req кладется res, в res кладется next
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  errorPreHandler(err);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "На сервере произошла ошибка" : err.message;
  res.status(statusCode).send({ message });
};

export default errorHandler;
