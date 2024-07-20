import { hotelsApi } from "@/api/modules/hotels";
import type { Hotel } from "@/types/hotel";
import type { QueryFields } from "@/validations/query";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export type QuerySortBy = "stars" | "total_price";
export type QuerySortType = "asc" | "desc";

export interface QueryParams extends QueryFields {
  sortBy: QuerySortBy;
  sortType: QuerySortType;
}

export const useQueryStore = defineStore("query", () => {
  const sortBy = useLocalStorage<QuerySortBy>("sortBy", "stars");
  const sortType = useLocalStorage<QuerySortType>("sortBy", "asc");

  const hotels = ref<Hotel[]>([]);

  const lastQueryFields = ref<QueryFields>();

  async function handleSearchHotels(data: QueryFields) {
    try {
      hotels.value = [];
      lastQueryFields.value = data;
      const response = await hotelsApi.list({
        ...data,
        sortBy: sortBy.value,
        sortType: sortType.value,
      });
      hotels.value = response.data;
    } catch (error) {
      // #TODO
    }
  }

  async function handleChangeSort(
    _sortBy: QuerySortBy,
    _sortType: QuerySortType
  ) {
    sortBy.value = _sortBy;
    sortType.value = _sortType;

    if (lastQueryFields.value) {
      await handleSearchHotels(lastQueryFields.value);
    }
  }

  return {
    hotels,
    handleChangeSort,
    handleSearchHotels,
  };
});