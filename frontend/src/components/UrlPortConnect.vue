<template>
  <v-form v-model="valid" @submit="submit">

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn :loading="loading" type="submit" block class="mt-2" text="Submit"></v-btn>
        </v-col>
      </v-row>

  </v-form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        loading: false,
        timeout: 0,
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
          (value: string) => {
            if (value) return true;

            return 'Name is required.';
          },
          (value: any) => {
            if (value?.length <= 10) return true;

            return 'Name must be less than 10 characters.';
          },
        ],
        email: '',
        emailRules: [
          (value: string) => {
            if (value) return true;

            return 'E-mail is required.';
          },
          (value: string) => {
            if (/.+@.+\..+/.test(value)) return true;

            return 'E-mail must be valid.';
          },
        ],
      };
    },
    methods: {
      async submit() {
        this.loading = true;
        const results = await this.checkApi(this.firstname);
        alert(JSON.stringify(results, null, 2));
        this.loading = false;
      },
      async checkApi(userName: string | null) {
        return new Promise<string | boolean>((resolve) => {
          clearTimeout(this.timeout);

          this.timeout = setTimeout(() => {
            if (!userName) return resolve('Please enter a user name.');
            if (userName === 'johnleider')
              return resolve('User name already taken. Please try another one.');

            return resolve(true);
          }, 1000);
        });
      },
    },
  });
</script>
