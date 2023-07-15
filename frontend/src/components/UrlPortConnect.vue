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
    const timeout = ref(0);
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
      alert(results);
      loading.value = false;
    };

    const checkApi = (urls: string, ports: string) => {
      return new Promise<string | boolean>((resolve) => {
        clearTimeout(timeout.value);
        timeout.value = setTimeout(() => {
          if (!urls) return resolve("Please enter a URL.");
          if (!ports) return resolve("Please enter a Port.");
          return resolve("Success");
        }, 1000);
      });
    };

    const updateUrl = (value: string) => {
      store.commit("updateUrl", value);
    };

    const updatePort = (value: string) => {
      store.commit("updatePort", value);
    };

    return {
      loading,
      timeout,
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
