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
                  v-model="description"
                  variant="solo"
                ></v-textarea>
              </v-col>

              <v-col cols="12" v-if="error">
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
            v-if="alertValue.type === 'success'"
            size="x-large"
            :class="alertValue.icon"
            style="font-size: 5rem"
            color="#22bb66"
          ></v-icon>

          <v-icon
            v-else-if="alertValue.type === 'error'"
            size="x-large"
            :class="alertValue.icon"
            style="font-size: 5rem"
            color="red"
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
            @click="successDialog = false"
            >{{ alertValue.label }}</v-btn
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
    const store = useStore(key);

    const portValue = computed(() => store.state.port);
    const urlValue = computed(() => store.state.url);
    const alertValue = computed(() => store.state.alert);

    const loading = ref(false);
    const valid = ref(false);
    const name = ref("");
    const postCode = ref("");
    const Price = ref("");
    const description = ref("");

    const error = ref("");

    const submit = async () => {
      loading.value = true;
      error.value = "";

      if (
        !name.value ||
        !postCode.value ||
        !Price.value ||
        !description.value
      ) {
        error.value = "Please fill in all the required fields.";
        return;
      }

      const data = {
        name: String(name.value),
        post_code: Number(postCode.value),
        price: Number(Price.value),
        desc: String(description.value),
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
          // Set Input == null
          name.value = "";
          postCode.value = "";
          Price.value = "";
          description.value = "";
          // Close Dialog And Update Data
          dialog.value = false;
          await insertData(result);
          // Show success alert
          showAlert(
            "Create success!",
            "success",
            "CONTINUE",
            "Success",
            "mdi mdi-check-circle"
          );
        } else {
          showAlert(
            "Let's try one more again",
            "error",
            "TRY AGAIN",
            "Fail",
            "mdi mdi-close-circle"
          );
        }
      } catch (err: any) {
        showAlert(
          "Let's try one more again",
          "error",
          "TRY AGAIN",
          "Fail",
          "mdi mdi-close-circle"
        );
      }

      loading.value = false;
    };

    const insertData = async (itemNew: any) => {
      store.commit("insertData", itemNew);
    };

    const showAlert = (
      message: string,
      type: string,
      label: string,
      title: string,
      icon: string
    ) => {
      const alert = {
        message,
        type,
        label,
        title,
        icon,
      };
      store.commit("showAlert", alert);
      // Show success dialog
      successDialog.value = true;
    };

    return {
      loading,
      valid,
      name,
      postCode,
      Price,
      description,
      urlValue,
      portValue,
      error,
      submit,
      dialog,
      alertValue,
      successDialog,
    };
  },
});
</script>
