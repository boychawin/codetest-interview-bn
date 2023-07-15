<template>
  <div>
    <v-sheet class="flex-wrap d-flex">
      <v-sheet class="flex-1-0 ma-2 pa-2">
        <h1 class="text-red-500">{{ title }} / {{ count }}</h1>
      </v-sheet>

      <v-sheet class="ma-2 pa-2">
        <AddDialog />
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
     
            <tr v-for="item in items" :key="item.id" class="text-center">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.post_code }}</td>
              <td>{{ item.price }}</td>
              <td width="250">
                <DialogViewandEdit title="VIEW DETAIL" :id="item.id" :name="item.name" :post_code="item.post_code" :price="item.price"  :description="item.description"/>
                <DialogDelete title="DELETE" :id="item.id" :name="item.name"/>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </v-sheet>
    <div class="text-center">
      <!-- Pagination -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store/store';
import AddDialog from "./DialogAdd.vue";
import DialogViewandEdit from "./DialogViewandEdit.vue";
import DialogDelete from "./DialogDelete.vue";

// interface Item {
//   name: string;
//   id: string;
//   description: string;
//   price: string;
//   post_code: string;
// }

export default defineComponent({

  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore(key);
    // const items = ref<Item[]>([]);
    const portValue = computed(() => store.state.port);
    const urlValue = computed(() => store.state.url);
    const items = computed(() => store.state.payload);
    const count = computed(() => store.state.count);
    
    console.log(count)
    // Fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(`${urlValue.value}:${portValue.value}/home?skip=0&take=100`);
        const data = await response.json();
        // items.value = data.payload;
         fetchDataRedux(data.payload,data.count)
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataRedux = (payload: any,count:number) => {
      store.commit("fetchData", payload);
      store.commit("fetchDataCount", count);
    };
    
    

    onMounted(fetchData); // Fetch data on component mount

    return {
      items,
      count
    };
  },
  
  components: {
    AddDialog,
    DialogViewandEdit,
    DialogDelete,
  },
});
</script>
