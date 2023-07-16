<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" xs="12" sm="12" md="4" lg="4">
          <v-container class="max-width">
            <v-combobox
              clearable
              label="Select Post Code"
              v-model="selectedPostCode"
              :items="displayedPostCodItems.map((item:any) => item.post_code)"
              variant="solo"
            ></v-combobox>
            <div class="item-list">
              <div
                v-for="item in fetchedData"
                :key="item.post_code"
                class="list-item"
              >
                <h3>Average: {{ item.average }}</h3>
                <h3>Median: {{ item.median }}</h3>
              </div>
            </div>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { key } from "../store/store";

interface Item {
  post_code: string;
  average: number | null;
  median: number | null;
}

export default defineComponent({
  setup() {
    const store = useStore(key);
    const portValue = computed(() => store.state.port);
    const urlValue = computed(() => store.state.url);
    const selectedPostCode = ref<string | null>(null);
    const fetchedData = ref<Item[]>([]);

    // Fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${urlValue.value}:${portValue.value}/postCode/${selectedPostCode.value}`
        );
        if (!response.ok) {
          throw new Error("Fetch request failed");
        }
        const data = await response.json();
        fetchedData.value = [data.payload];
      } catch (error) {
        console.error(error);
      }
    };

    // Watch for changes in selectedPostCode and fetch data
    watch(selectedPostCode, () => {
      if (selectedPostCode.value) {
        fetchData();
      } else {
        fetchedData.value = [];
      }
    });
    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          `${urlValue.value}:${portValue.value}/postCode`
        );
        if (!response.ok) {
          throw new Error("Fetch request failed");
        }
        const data = await response.json();
        fetchDataPostCodeRedux(data.payload, data.count);
      } catch (error) {
        console.error(error);
      }
    };

    const displayedPostCodItems = computed(() => {
      return store.state.payloadPostCode;
    });

    const fetchDataPostCodeRedux = (payload: any, count: number) => {
      store.commit("fetchDataPostCode", payload);
      store.commit("fetchDataPostCodeCount", count);
    };
    fetchInitialData();

    return {
      selectedPostCode,
      displayedPostCodItems,
      fetchedData,
    };
  },
});
</script>

<style scoped>
/* CSS styles */
</style>
