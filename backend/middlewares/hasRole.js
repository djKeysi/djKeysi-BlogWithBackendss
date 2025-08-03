//проверка ролей пользователя
module.exports = function (roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.send({ error: "Access denied" });

      // отправляем на фронтенд ошибку

      return;
    }
    next(); // иначе пропускаем пользователя дальше
  };
};
