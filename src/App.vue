<template>
  <div id="app">
    <header>
      <h1>Sample Tools</h1>
      <nav class="header-nav">
        <router-link to="/" class="nav-link" active-class="nav-link--active">
          Loop Extractor
        </router-link>
        <router-link to="/translation-table" class="nav-link" active-class="nav-link--active">
          Translation Table
        </router-link>
        <router-link to="/about" class="nav-link" active-class="nav-link--active">
          About
        </router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 2rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

h1 {
  margin: 0 0 1rem 0;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.header-nav {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
}

.nav-link--active {
  color: white;
  background: rgba(255, 255, 255, 0.25);
}
</style>
