<template>
  <div>
    <header class="pt-12 bg-blue-grey-lighten-5">
      <v-container>
        <UrlPortConnect msg="1" />
      </v-container>
    </header>
    <main class="bg-white">
      <v-container>
        <slot></slot>
      </v-container>
    </main>
    <footer class="pt-3 pb-28 ">
      <v-container class="bg-blue-grey-lighten-5">
        <SelectPostCode msg="1" />
      </v-container>
    </footer>
  </div>
</template>

<script setup lang="ts">
import UrlPortConnect from "./UrlPortConnect.vue";
import SelectPostCode from "./SelectPostCode.vue";
</script>
