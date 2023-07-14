<template>
    <div>
      <header class="bg-blue-grey-lighten-5 pt-12">
        <v-container>
          <UrlPortConnect msg="1"/>
        </v-container>
      
      </header>
      <main class="bg-white">
        <v-container>
          <slot></slot>
        </v-container>
        <!-- Main content goes here -->
       
      </main>
      <footer>
        <v-container>

        </v-container>
        <!-- <SelectPostCode msg="1"/> -->
      </footer>
    </div>
  </template>
  <script setup lang="ts">
  import UrlPortConnect from './UrlPortConnect.vue';

  // import SelectPostCode from './SelectPostCode.vue';
  </script>
  