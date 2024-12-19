<script setup>
import * as icons from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: Number,
  color: String,
  strokeWidth: Number,
  defaultClass: String,
});

const LucideIcon = computed(() => icons[props.name]);
</script>
<template>
  <component
    :is="LucideIcon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>
