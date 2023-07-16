<template>
  <div>
    <v-sheet class="flex-wrap d-flex">
      <v-sheet class="flex-1-0 ma-2 pa-2">
        <h1 class="text-red-500">{{ title }} || {{ count }}</h1>
      </v-sheet>

      <v-sheet class="ma-2 pa-2">
        <AddDialog />
      </v-sheet>

      <v-sheet class="flex-1-1-100 ma-2 pa-2">
        <v-select v-model="itemsPerPage" :items="perPageOptions" label="Items Per Page" dense outlined @input="updateItemsPerPage"></v-select>
      </v-sheet>

      <v-sheet class="flex-1-1-100 ma-2 pa-2">
        <v-table fixed-header height="300px">
          <thead>
            <tr>
              <th width="100" class="text-center text-body-2 font-weight-black">ID</th>
              <th class="text-center text-body-2 font-weight-black">Name</th>
              <th class="text-center text-body-2 font-weight-black">Post Code</th>
              <th class="text-center text-body-2 font-weight-black">Price</th>
              <th class="text-center text-body-2 font-weight-black">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in displayedItems" :key="item.id" class="text-center">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.post_code }}</td>
              <td>{{ item.price }}</td>
              <td width="250">
                <DialogViewandEdit
                  title="VIEW DETAIL"
                  :id="item.id"
                  :name="item.name"
                  :post_code="item.post_code"
                  :price="item.price"
                  :description="item.description"
                />
                <DialogDelete title="DELETE" :id="item.id" :name="item.name" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </v-sheet>
    <!-- <div class="text-center">
      <v-btn @click="previousPage" :disabled="currentPage === 1">Previous</v-btn>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <v-btn @click="nextPage" :disabled="currentPage === totalPages">Next</v-btn>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store/store';
import AddDialog from "./DialogAdd.vue";
import DialogViewandEdit from "./DialogViewandEdit.vue";
import DialogDelete from "./DialogDelete.vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore(key);
    const portValue = computed(() => store.state.port);
    const urlValue = computed(() => store.state.url);
    const currentPage = ref(1); // Current page number
    const itemsPerPage = ref(5); // Number of items to display per page
    const perPageOptions = [5,10, 25, 50, 100]; // Available options for items per page
    const totalPages = computed(() => Math.ceil(store.state.count / itemsPerPage.value));
    const count = computed(() => store.state.count);
   
    // Fetch data
    const fetchData = async (skip: number, take: number) => {
      try {
        const response = await fetch(`${urlValue.value}:${portValue.value}/home?skip=${skip}&take=${take}`);
        const data = await response.json();
        fetchDataRedux(data.payload, data.count);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataRedux = (payload: any, count: number) => {
      store.commit("fetchData", payload);
      store.commit("fetchDataCount", count);
    };

    // const previousPage = async () => {
    //   if (currentPage.value > 1) {
    //     currentPage.value--;
    //     await fetchDataFromPage(currentPage.value);
    //   }
    // };

    // const nextPage = async () => {
    //   if (currentPage.value < totalPages.value) {
    //     currentPage.value++;
    //     await fetchDataFromPage(currentPage.value);
    //   }
    // };

    const fetchDataFromPage = async (page: number) => {
      const skip = (page - 1) * itemsPerPage.value;
      await fetchData(skip, itemsPerPage.value);
    };

    const updateItemsPerPage = async () => {
      currentPage.value = 1;
      await fetchDataFromPage(currentPage.value);
    };

    onMounted(() => {
      fetchDataFromPage(currentPage.value);
    });

    const displayedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return store.state.payload.slice(startIndex, endIndex);
    });

    return {
      count,
      displayedItems,
      currentPage,
      itemsPerPage,
      perPageOptions,
      totalPages,
      // previousPage,
      // nextPage,
      updateItemsPerPage,
    };
  },
  components: {
    AddDialog,
    DialogViewandEdit,
    DialogDelete,
  },
});
</script>
