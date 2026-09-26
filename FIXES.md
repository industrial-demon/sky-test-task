# Знайдені й виправлені проблеми

Заповнюється кандидатом. Для кожної проблеми — 1-3 речення: що було не так
і чому саме так поводилось.

1. Перша проблема була втрачена реактивність при зміні товару у листі в карточці ізза пропущеного спеціального атрибута :key , :key="selectedProduct.id" , ну це проблема у всіх фрейморках у React це теж key у Angular  це track;
2. У файлі src\api\client.js якщо я правильно зрозумів то прокидую помилку далі , і в сторі products обернув в try/catch/finally щоб обробляти помилку , проміс reject доречі треба щоб він корректно у сторі unwrap робив в блоці try/catch, бо він в try буде тікти без цього;
3. "список товарів при швидкому подвійному кліку «Оновити» іноді показує застарілі дані поверх свіжих" - oцю проблему в мене не вдалося відтворити щоб поверх дани накладувались я не спостерігав;

4. в докерфайлі оця строка не правильна COPY --from=builder , треба те ім'я яке вказано тут FROM node:20-alpine AS build -> --from=build 
Dockerfile:13

--------------------

  11 |     FROM nginx:alpine

  12 |     

  13 | >>> COPY --from=builder /app/dist /usr/share/nginx/html

  14 |     

  15 |     EXPOSE 80

--------------------

failed to solve: builder: failed to resolve source metadata for docker.io/library/builder:latest: pull access denied, repository does not exist or may require authorization: server message: insufficient_scope: authorization failed (did you mean build?)


5. проблема в package-lock.json , тому що треба соблюдати весрсіонку пакетів які на проекті


Окремо — історія операцій: 
наскількі я зрозумів це тіпо щось таке
entry.product.stock - entry.product.minStock

але без уточнень тажко сказати що мали на увазі і яка формула 
і виходить одна частина статична history друга як вкладений продукт динамічна

можно звісно наліпити але то не дуже гарне рішення буде, бо тіпо расінхрон з database

по гарному воно повинно на беці висщітувати як закладено бл, і писати при update в 2 таблиці
поле stock в продукт, і  amount у хісторі як похідну від цього stock 





