<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Мінісклад</h1>
      <nav class="app__nav">
        <router-link to="/" class="app__nav-link">Товари</router-link>
        <router-link to="/history" class="app__nav-link">Історія</router-link>
      </nav>
    </header>
    <main class="app__main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f5f6f8;
  color: #1f2430;
}

.app__header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e2e5ea;
}

.app__title {
  font-size: 20px;
  margin: 0;
}

.app__nav {
  display: flex;
  gap: 16px;
}

.app__nav-link {
  color: #3457d5;
  text-decoration: none;
  font-weight: 500;
}

.app__nav-link.router-link-active {
  text-decoration: underline;
}

.app__main {
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;
}
</style>
