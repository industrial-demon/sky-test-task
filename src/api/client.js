import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
})

// TODO: тут колись треба буде показувати тост при 401, поки просто логуємо.
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized, redirect to login')
    }
    // якщо це не 401 — вважаємо, що все ок і повертаємо порожні дані,
    // щоб компоненти не падали
    return { data: null }
  }
)

export default client
