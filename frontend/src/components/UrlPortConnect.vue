<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          variant="solo"
          v-model="urls"
          :rules="urlRules"
          :counter="10"
          label="URL"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field

          variant="solo"
          v-model="ports"
          :rules="portRules"
          :counter="10"
          label="PORT"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn
          variant="flat"
          type="submit"
          size="x-large"
          class="px-5 text-white"
          :loading="loading"
          color="indigo"
          block
          text="CONNECT"
        ></v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  setup() {
    const store = useStore(key);

    const portValue = computed(() => store.state.port);
    const urlValue = computed(() => store.state.url);

    const loading = ref(false);
    const valid = ref(false);
    const urls = ref(urlValue.value || "");
    const urlRules = [
      (value: string) => {
        if (value) return true;
        return "URL is required.";
      },
    ];
    const ports = ref(portValue.value);
    const portRules = [
      (value: string) => {
        if (value) return true;
        return "Port is required.";
      },
    ];

    const submit = async () => {
      loading.value = true;
      const results = await checkApi(urls.value, ports.value);
      updateUrl(urls.value);
      updatePort(ports.value);
      fetchData();
      fetchDataPostCode();
      alert(results);
      loading.value = false;
    };

    const checkApi = (urls: string, ports: string) => {
      return new Promise<string | boolean>((resolve) => {
        if (!urls) return resolve("Please enter a URL.");
          if (!ports) return resolve("Please enter a Port.");

          
        return  resolve("Connect Success");
      })
    };

    const updateUrl = (value: string) => {
      store.commit("updateUrl", value);
    };

    const updatePort = (value: string) => {
      store.commit("updatePort", value);
    };

    // Fetch data
    const fetchData = async () => {
      try {
      
        const response = await fetch(
          `${store.state.url}:${store.state.port}/home?skip=${0}&take=${10}`
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


    const fetchDataPostCode = async () => {
      try {
        const response = await fetch(
          `${urlValue.value}:${portValue.value}/postCode`
        );
        if (!response.ok) {
          throw new Error("Fetch request failed");
        }
        const data = await response.json();
        fetchDataPostCodeRedux(data.payload,data.count)
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataPostCodeRedux = (payload: any, count: number) => {
      store.commit("fetchDataPostCode", payload);
      store.commit("fetchDataPostCodeCount", count);
    };

    return {
      loading,
      valid,
      urls,
      urlRules,
      ports,
      portRules,
      urlValue,
      portValue,
      submit,
    };
  },
});
</script>
