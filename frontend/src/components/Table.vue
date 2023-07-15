<template>
  <div>
 

<v-sheet class="flex-wrap d-flex ">
    <v-sheet class="flex-1-0 ma-2 pa-2">
      <h1 class="text-red-500">{{ title }}</h1>
    </v-sheet>

    <v-sheet class="ma-2 pa-2">
  
      <v-btn  size="x-large" type="submit" variant="flat" color="#22bb66" class="text-white" block text="CREATE"></v-btn>
    </v-sheet>

    <v-sheet class="flex-1-1-100 ma-2 pa-2">
       
      <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th width="100" class="text-center text-body-2 font-weight-black ">ID</th>
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
          <td >
            <v-btn variant="flat" color="amber-lighten-5" rounded="xl" class="mr-2 text-amber-lighten-1">VIEW DETAIL</v-btn>
            <v-btn  variant="flat" color="red-lighten-5" class="text-red-lighten-1" rounded="xl" >DELETE</v-btn>
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
import { defineComponent ,computed, ref} from 'vue';
import { useStore } from 'vuex';
import { key } from '../store/store';

interface Item {
  name:any
    id:any
    description:any
    price:any
    post_code:any
}


export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore(key);
    const items = ref<Item[]>([]);
    const portValue = computed(() => store.state.port);
    const urlValue = computed(() => store.state.url);
    const page = ref<string | null>(null);

    // Fetch data
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`${urlValue.value}:${portValue.value}/home?skip=0&take=100`);
        const data = await response.json();
        items.value = data.payload;
      } catch (error) {
        console.error(error);
      }
    
    };
    fetchInitialData(); // Fetch initial data on component mount
    
    return {
      page,
      items,
      portValue,
      urlValue
    }
  },

});
</script>
