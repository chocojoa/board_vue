<template>
  <div class="pagination">
    <button @click="table.previousPage" :disabled="!table.getCanPreviousPage()">
      Previous
    </button>
    <span> Page {{ table.getState().pagination.pageIndex + 1 }} </span>
    <button @click="table.nextPage" :disabled="!table.getCanNextPage()">
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  table: Object,
});
</script>
