import { reactive, toRefs } from "vue";

export default function useSorting(
  initialField = "rowNumber",
  initialOrder = "DESC"
) {
  const sorting = reactive([
    {
      id: initialField,
      desc: initialOrder === "DESC",
    },
  ]);

  const onSortingChange = (newSorting) => {
    sorting[0] = { id: newSorting[0].id, desc: newSorting[0].desc };
  };

  const order = sorting.length && sorting[0].desc ? "DESC" : "ASC";
  const field = sorting.length ? sorting[0].id : initialField;

  return {
    ...toRefs({ sorting, order, field }),
    onSortingChange,
  };
}
