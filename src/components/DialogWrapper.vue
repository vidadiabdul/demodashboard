<template>
  <v-dialog
    v-model="isDialogOpen"
    :max-width="maxWidth"
  >
    <v-card rounded="lg">
      <v-card-title>{{ title }}</v-card-title>
      <v-divider class="mb-4" />
      <slot name="content" />
      <v-divider class="mt-2" />
      <v-card-actions class="my-2 d-flex justify-end">
        <slot name="actions">
          <v-btn
            class="text-none"
            rounded="xl"
            text="Bağla"
            @click="closeDialog"
          >
            Bağla
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: "DialogWrapper",
  props: {
    title: {
      type: String,
      default: "",
    },
    maxWidth: {
      type: String,
      default: "500",
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isDialogOpen: {
      get() {
        return this.modelValue;
      },
      set(value: unknown) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
};
</script>
