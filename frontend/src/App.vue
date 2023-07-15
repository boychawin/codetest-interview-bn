<template>
  <div >
    <Layout>
      <Table title="House List"/>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import Layout from './components/Layout.vue';
import Table from './components/Table.vue';

</script>
<!-- <template>
  <div>
    <p>Counter Value: {{ counterValue }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from './store/store';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore(key);

    const counterValue = computed(() => store.state.value);
    const increment = () => store.commit('increment');
    const decrement = () => store.commit('decrement');

    return {
      counterValue,
      increment,
      decrement,
    };
  },
});
</script> -->
