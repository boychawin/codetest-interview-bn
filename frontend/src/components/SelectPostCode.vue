<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div>
    <h1 class="text-red-500">{{ msg }}</h1>
    <v-combobox
  clearable
  label="Combobox"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  variant="solo"
></v-combobox>

  </div>
</template>

<style scoped>
</style>
