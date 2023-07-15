<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="720">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="flat"
          color="#22bb66"
          size="x-large"
          class="px-5 text-white"
          v-bind="props"
        >
          CREATE
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h6 font-weight-black">Create</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit.prevent="submit">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  variant="solo"
                  v-model="name"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  variant="solo"
                  v-model="postCode"
                  label="Post Code"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  variant="solo"
                  v-model="Price"
                  label="Price"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  label="Description"
                  v-model="Description"
                  variant="solo"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-alert v-if="error" type="error" :title="error"></v-alert>
              </v-col>

              <v-container>
                <v-row justify="center">
                  <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                    <v-card-actions class="text-center">
                      <v-spacer></v-spacer>

                      <v-btn
                        class="px-5"
                        size="large"
                        color="grey-darken-1"
                        variant="outlined"
                        @click="dialog = false"
                      >
                        CANCEL
                      </v-btn>
                      <v-btn
                        variant="flat"
                        color="#22bb66"
                        type="submit"
                        size="large"
                        class="px-5 text-white"
                      >
                        CREATE
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="successDialog" max-width="300">
      <v-card class="py-8 text-center">
        <p>
          <v-icon
            size="x-large"
            class="mdi mdi-check-circle"
            style="font-size: 5rem"
            color="#22bb66"
          ></v-icon>
        </p>
        <p class="text-h5 font-weight-black">{{ alertValue.title }}</p>
        <span class="text-body-2 text-disabled">{{ alertValue.message }}</span>

        <v-card-actions class="justify-center">
          <v-btn
            size="large"
            class="px-5"
            color="grey-darken-1"
            variant="outlined"
            text
            @click="successDialog = false"
            >CONTINUE</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  setup() {
    const dialog = ref(false);
    const successDialog = ref(false);
    const successMessage = ref("");
    const store = useStore(key);

    const portValue = computed(() => store.state.port);
    const urlValue = computed(() => store.state.url);
    const alertValue = computed(() => store.state.alert);

    const loading = ref(false);
    const timeout = ref(0);
    const valid = ref(false);
    const name = ref("");
    const postCode = ref("");
    const Price = ref("");
    const Description = ref("");
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

    const error = ref("");

    const submit = async () => {
      loading.value = true;
      error.value = "";
      if (
        !name.value ||
        !postCode.value ||
        !Price.value ||
        !Description.value
      ) {
        error.value = "Please fill in all the required fields.";
        return;
      }

      const data = {
        name: name.value,
        post_code: Number(postCode.value),
        price: Number(Price.value),
        desc: Description.value,
      };

      try {
        const response = await fetch(
          `${urlValue.value}:${portValue.value}/home`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result); // Handle the response data

          // Show success dialog
          dialog.value = false;

          // Show success alert
          const successMessage = "Create success!";
          showAlert(successMessage, "success");
        } else {
          const errorMessage = await response.text();
          error.value = errorMessage || "An error occurred.";
          console.error("Error:", response.status);
        }
      } catch (err: any) {
        error.value = err.message || "An error occurred.";
        console.error("Error:", err);
      }

      loading.value = false;
    };

    const showAlert = (message: string, type: string) => {
      const alert = {
        message,
        type,
        title: "Success",
        icon: "mdi-check-circle-outline",
      };

      // Show the alert using your preferred method (e.g., Vuex store, event bus, etc.)
      // Example using Vuex store:
      store.commit("showAlert", alert);

      // Show success dialog
      successMessage.value = message;
      successDialog.value = true;
    };

    return {
      loading,
      timeout,
      valid,
      name,
      postCode,
      Price,
      Description,
      urlRules,
      ports,
      portRules,
      urlValue,
      portValue,
      error,
      submit,
      dialog,
      alertValue,
      successDialog,
      successMessage,
    };
  },
});
</script>
