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
              :items="items.map((item) => item.post_code)"
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
    const items = ref<Item[]>([]);
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
        // alert("Failed to fetch data. Please check your network connection.");
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
        items.value = data.payload;
      } catch (error) {
        console.error(error);
        // alert(
        //   "Failed to fetch initial data. Please check your network connection."
        // );
      }
    };

    fetchInitialData(); // Fetch initial data on component mount
    // console.log(`${urlValue}:${portValue}/postCode`)
    return {
      selectedPostCode,
      items,
      fetchedData,
    };
  },
});
</script>

<style scoped>
/* CSS styles */
</style>
