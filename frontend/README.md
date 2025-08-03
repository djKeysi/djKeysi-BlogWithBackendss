Области хранения данных

- база данных JSON -SERVER
- BFF
- редакс стор

Сущности приложения

- пользователь: БД(список пользователей),BFF (сессия текущего пользов), стор (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью) , стор (использование на клиенте)
- статья: БД (список статей), стор (отображение в браузере)
- коментарий: БД (список коментариев), стор (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registered_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- коментарии - comments: id / author_id / post_id / content/ published_at

Схема состояния на BFF:

- сессия текущего пользов:login / password / role

Схема для редакс сторе (на клиенте):

- user: id / login / roleId /session
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users : массив user: id /login / registeredAt /role

// создание картинки
https://picsum.photos/280/150

json-server --watch src/db.json --port 3005

npm i
