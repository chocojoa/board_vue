import { reactive, toRefs } from "vue";

export default function usePagination(initPageSize = 10, initPageIndex = 0) {
  const pagination = reactive({
    pageSize: initPageSize,
    pageIndex: initPageIndex,
  });

  const onPaginationChange = (newPagination) => {
    pagination.pageSize = newPagination.pageSize;
    pagination.pageIndex = newPagination.pageIndex;
  };

  return {
    ...toRefs(pagination),
    onPaginationChange,
  };
}
