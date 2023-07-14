<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    :search="search"
    class="elevation-1"
    item-value="name"
    @update:options="loadItems"
  ></v-data-table-server>
</template>

<script lang="ts">
  const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1',
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0',
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6',
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7',
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16',
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1',
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2',
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8',
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45',
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22',
    },
  ]

  const FakeAPI = {
    async fetch({ page, itemsPerPage, sortBy }:any) {
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const end = start + itemsPerPage
          const items = desserts.slice()

          if (sortBy.length) {
            const sortKey = sortBy[0].key
            const sortOrder = sortBy[0].order
            items.sort((a:any, b:any) => {
              const aValue = a[sortKey]
              const bValue = b[sortKey]
              return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
            })
          }

          const paginated = items.slice(start, end)

          resolve({ items: paginated, total: items.length })
        }, 500)
      })
    },
  }

  import { defineComponent } from 'vue';
 


export default defineComponent({
  components: {
    // VDataTableCell,
    // VDataTableHeader,
    // VDataTableServer,
  },
    data: () => ({
      itemsPerPage: 5,
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Calories', key: 'calories', align: 'end' },
        { title: 'Fat (g)', key: 'fat', align: 'end' },
        { title: 'Carbs (g)', key: 'carbs', align: 'end' },
        { title: 'Protein (g)', key: 'protein', align: 'end' },
        { title: 'Iron (%)', key: 'iron', align: 'end' },
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
    }),
    methods: {
      loadItems({ page, itemsPerPage, sortBy }:any) {
        this.loading = true
        FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(
          ({ items, total }:any) => {
            this.serverItems = items
            this.totalItems = total
            this.loading = false
          }
        )
      },
    },
  });
</script>



<!-- <template>
  <div>
    <h1 class="text-red-500">{{ title }}</h1>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-body-2 text-center font-weight-black">ID</th>
          <th class="text-body-2 text-center font-weight-black">Name</th>
          <th class="text-body-2 text-center font-weight-black">Post Code</th>
          <th class="text-body-2 text-center font-weight-black">Price</th>
          <th class="text-body-2 text-center font-weight-black">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </v-table>

    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="15"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Pagination from './Pagination.vue';

export default defineComponent({
  data() {
    return {
      title: '',
      page: 1,
      desserts: [
        { name: 'Frozen Yogurt', calories: 159 },
        { name: 'Ice cream sandwich', calories: 237 },
        { name: 'Eclair', calories: 262 },
        { name: 'Cupcake', calories: 305 },
        { name: 'Gingerbread', calories: 356 },
        { name: 'Jelly bean', calories: 375 },
        { name: 'Lollipop', calories: 392 },
        { name: 'Honeycomb', calories: 408 },
        { name: 'Donut', calories: 452 },
        { name: 'KitKat', calories: 518 },
      ],
    };
  },
  // components: {
  //   Pagination,
  // },
});
</script> -->
