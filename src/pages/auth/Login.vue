<template>
  <v-container class="pa-0 h-100">
    <v-row class="align-center h-100 ma-0">
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="7"
        class="d-flex justify-center align-center h-100"
        style="background-color: #1c444d"
      >
        <v-img :src="logo" max-width="232" />
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="4" class="ma-auto">
        <h3 class="mb-3">Daxil ol</h3>
        <Form :validation-schema="validationSchema" @submit="onSubmit">
          <div>
            <div>
              <label for="email" class="label">Email</label>
              <Field name="email" type="text" class="input" />
            </div>
            <ErrorMessage name="email" class="error" />
          </div>
          <div class="mt-3">
            <div>
              <label for="password" class="label">Password</label>
              <Field name="password" type="password" class="input" />
            </div>
            <ErrorMessage name="password" class="error" />
          </div>
          <v-btn
            class="pa-4 mt-4"
            type="submit"
            color="#1F737F"
            block
            :loading="loading"
            :disabled="loading"
          >
            Daxil ol
          </v-btn>
        </Form>
        <div class="d-flex align-center justify-center mt-4">
          <h5 class="me-3">Hesabin yoxdur?</h5>
          <v-btn variant="text" :to="'/register'">Qeydiyyat</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import logo from "@/assets/ae.svg";
import { login } from "@/services/authService";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useRouter } from "vue-router";

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),
    password: zod
      .string()
      .min(1, { message: "This is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
  })
);
const router = useRouter();
const loading = ref(false);

const onSubmit = async (values: { email: string; password: string }) => {
  loading.value = true;
  try {
    const response = await login(values.email, values.password);
    router.push("/");
  } catch (err: unknown) {
    console.error(err);
  } finally {
    loading.value = false;
  }

  return { onSubmit, loading, logo };
};
</script>

<style>
.error {
  font-size: 12px;
  color: crimson;
}

.label {
  display: block;
}
.input {
  border: 1px solid #949494;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
}
</style>
