<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h2 class="green">CPU / Disk Scheduling</h2>
      <h5>Choose your algorithm</h5>

      <nav>
        <RouterLink to="/">Priority (NP)</RouterLink>
        <RouterLink to="/mqs">MQS</RouterLink>
        <RouterLink to="/sstf">SSTF</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
}

nav {
  text-align: center;
  margin: 0 auto;
  display: inline-block;
  padding: 1rem 0;
}

nav a.router-link-exact-active {
  color: #2c3e50;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.wrapper {
  text-align: center;
  margin-bottom: 2rem;
}

.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
</style>
