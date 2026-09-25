# Мінісклад

Стартовий каркас для тестового завдання. Повний текст завдання — у файлі
`Тестове_завдання_Frontend_Vue.docx`, що додається окремо.

## Запуск

```bash
npm install
npm run mock-api    # фейковий бекенд на http://localhost:3001
npm run serve        # застосунок на http://localhost:8080 (в іншому терміналі)
npm test             # unit-тести (vitest)
```

## Структура

```
src/
  api/client.js       — axios-обгортка
  stores/             — Pinia-стори
  router/             — маршрути
  views/              — сторінки
  components/         — компоненти (є один на Options API)
tests/                — vitest
db.json               — дані для json-server (mock-api)
Dockerfile, docker-compose.yml
ci-pipeline.yml       — заглушка CI (формат GitLab CI, запускати нікуди не треба)
```
