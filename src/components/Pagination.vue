<script setup>
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-icons/vue";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";

const props = defineProps({
  table: Object,
});

const currentPageIndex = ref(0);
const pageCount = ref(0);
const pageNumArray = ref([]);

currentPageIndex.value = props.table.getState().pagination.pageIndex;
pageCount.value = Math.ceil(
  props.table.getRowCount() / props.table.getState().pagination.pageSize
);
pageNumArray.value = Array.from(Array(pageCount).keys());
</script>

<template>
  <div class="flex items-center justify-between mt-2">
    <div class="flex items-center justify-center text-sm font-medium">
      Page {{ table.getState().pagination.pageIndex + 1 }} of
      {{ table.getPageCount() }}
    </div>
    <div class="flex items-center space-x-2">
      <Button
        variant="outline"
        class="hidden w-8 h-8 p-0 lg:flex"
        :disabled="!table.getCanPreviousPage()"
        @click="table.setPageIndex(0)"
      >
        <span class="sr-only">Go to first page</span>
        <DoubleArrowLeftIcon class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        <span class="sr-only">Go to previous page</span>
        <ChevronLeftIcon class="w-4 h-4" />
      </Button>
      <template v-for="pageNumber in pageNumArray">
        <Button
          variant="outline"
          size="sm"
          @click="table.setPageIndex(pageNumber)"
          :class="currentPageIndex === pageNumber ? 'font-bold' : undefined"
        >
          {{ pageNum + 1 }}
        </Button>
      </template>
      <Button
        variant="outline"
        class="w-8 h-8 p-0"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        <span class="sr-only">Go to next page</span>
        <ChevronRightIcon class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        class="hidden w-8 h-8 p-0 lg:flex"
        :disabled="!table.getCanNextPage()"
        @click="table.setPageIndex(table.getPageCount() - 1)"
      >
        <span class="sr-only">Go to last page</span>
        <DoubleArrowRightIcon class="w-4 h-4" />
      </Button>
    </div>
    <div class="flex items-center space-x-2">
      <p class="text-sm font-medium">Rows per page</p>
      <Select
        :model-value="`${table.getState().pagination.pageSize}`"
        @update:model-value="table.setPageSize"
      >
        <SelectTrigger class="h-8 w-[70px]">
          <SelectValue
            :placeholder="`${table.getState().pagination.pageSize}`"
          />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem
            v-for="pageSize in [10, 20, 30, 40, 50]"
            :key="pageSize"
            :value="`${pageSize}`"
          >
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
