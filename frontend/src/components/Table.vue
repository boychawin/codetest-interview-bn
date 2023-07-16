<template>
  <div>
    <v-sheet class="flex-wrap d-flex">
      <v-sheet class="flex-1-0 ma-2 pa-2">
        <h1 class="text-red-500">{{ title }}</h1>
      </v-sheet>

      <v-sheet class="ma-2 pa-2">
        <AddDialog />
      </v-sheet>

      <v-sheet class="flex-1-1-100 ma-2 pa-2" width="100">
        <v-table
          fixed-header
          class="table-with-border"
          tag="div"
          :hover="true"
          :height="tableHeight"
        >
          <thead>
            <tr>
              <th
                width="100"
                class="text-center table-row-r text-body-2 font-weight-black"
              >
                ID
              </th>
              <th class="text-center table-row-r text-body-2 font-weight-black">
                Name
              </th>
              <th class="text-center table-row-r text-body-2 font-weight-black">
                Post Code
              </th>
              <th class="text-center table-row-r text-body-2 font-weight-black">
                Price
              </th>
              <th class="text-center text-body-2 font-weight-black">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="displayedItems.length === 0" class="my-5 text-center">
              <td colspan="5" class="text-red-500">No data available</td>
            </tr>
            <tr
              v-for="item in displayedItems"
              :key="item.id"
              class="table-row text-center"
            >
              <td width="10" class="table-row-r">{{ item.id }}</td>
              <td width="30" class="table-row-r">{{ item.name }}</td>
              <td width="20" class="table-row-r">{{ item.post_code }}</td>
              <td width="20" class="table-row-r">{{ item.price }}</td>
              <td width="20">
                <div
                  class="text-center"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <DialogViewandEdit
                    title="VIEW DETAIL"
                    :id="item.id"
                    :name="item.name"
                    :post_code="item.post_code"
                    :price="item.price"
                    :description="item.description"
                  />
                  <DialogDelete
                    title="DELETE"
                    :id="item.id"
                    :name="item.name"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>

      <v-sheet class="text-right flex-1-1-100 ma-2 pa-2 text-body-2">
        Rows per page:
        <select v-model="itemsPerPage">
          <option
            v-for="option in perPageOptions"
            :value="option"
            :key="option"
          >
            {{ option }}
          </option>
        </select>

        {{ startIndex }}-{{ endIndex }} of {{ totalItems }}
      </v-sheet>
    </v-sheet>
  </div>
</template>

<style scoped>
.table-with-border {
  border: 0.5px solid #ccc;
  border-collapse: collapse;
}

.table-row-r {
  border-right: 0.5px solid #ccc;
}
</style>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { key } from "../store/store";
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
    const currentPage = ref(1); // Current page number
    const itemsPerPage = ref(10); // Number of items to display per page
    const perPageOptions = [5, 10, 25, 50, 100]; // Available options for items per page

    // Fetch data
    const fetchData = async () => {
      try {
        const skip = (currentPage.value - 1) * itemsPerPage.value;
        const take = itemsPerPage.value;
        const response = await fetch(
          `${store.state.url}:${store.state.port}/home?skip=${skip}&take=${take}`
        );
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

    watch([currentPage, itemsPerPage], () => {
      fetchData();
    });

    onMounted(() => {
      fetchData();
    });

    const displayedItems = computed(() => {
      return store.state.payload;
    });

    return {
      displayedItems,
      itemsPerPage,
      perPageOptions,
      startIndex: computed(
        () => (currentPage.value - 1) * itemsPerPage.value + 1
      ),
      endIndex: computed(() =>
        Math.min(currentPage.value * itemsPerPage.value, store.state.count || 0)
      ),
      totalItems: computed(() => store.state.count || 0),
    };
  },
  components: {
    AddDialog,
    DialogViewandEdit,
    DialogDelete,
  },
  computed: {
    tableHeight() {
      return this.displayedItems.length === 0 ? 100 : 500;
    },
  },
});
</script>
