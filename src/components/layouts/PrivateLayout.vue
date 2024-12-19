<script setup>
import { RouterView } from "vue-router";
import Nav from "./Nav.vue";
</script>

<template>
  <div class="bg-slate-50 h-screen">
    <Nav />
    <main>
      <div class="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8">
        <div class="bg-white border rounded-sm px-6 py-4">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>
