<template>
  <div class="rounded-md border">
    <table>
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :style="{ width: header.getSize() + 'px' }"
            @click="
              header.column.getCanSort() &&
              header.column.getToggleSortingHandler()
            "
          >
            <div class="flex items-center select-none cursor-pointer">
              <span v-if="!header.isPlaceholder">
                {{ header.column.columnDef.header(header.getContext()) }}
              </span>
              <span v-if="header.column.getIsSorted() === 'asc'" class="ml-1">
                ▲
              </span>
              <span
                v-else-if="header.column.getIsSorted() === 'desc'"
                class="ml-1"
              >
                ▼
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            {{ cell.column.columnDef.cell(cell.getContext()) }}
          </td>
        </tr>
        <tr v-if="!table.getRowModel().rows.length">
          <td :colspan="columns.length" class="h-12 text-center">
            No results.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :table="table" />
</template>

<script setup>
import { useVueTable, getCoreRowModel } from "@tanstack/vue-table";
import { ref, defineExpose } from "vue";
import Pagination from "./Pagination.vue";

// Props 받기
const props = defineProps({
  columns: Array,
  data: Array,
  totalCount: Number,
  pagination: Object,
  onPaginationChange: Function,
  sorting: Object,
  onSortingChange: Function,
});

// Table 객체
const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  rowCount: props.totalCount,
  manualPagination: true,
  manualSorting: true,
  onPaginationChange: props.onPaginationChange,
  onSortingChange: props.onSortingChange,
  autoResetPageIndex: false,
  state: {
    pagination: props.pagination,
    sorting: props.sorting,
  },
});

defineExpose({
  getTable: () => table,
});
</script>
