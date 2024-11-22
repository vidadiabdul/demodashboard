<template>
  <v-data-table :headers="headers" :items="guides" class="mt-4" item-value="id">
    <template #item.action="{ item }">
      <v-icon
        class="me-2"
        color="#454545"
        title="View"
        @click="openViewModal(item)"
      >
        mdi-eye-outline
      </v-icon>
    </template>
  </v-data-table>

  <!-- View Modal -->
  <v-dialog v-model="isViewModalOpen" max-width="500">
    <v-card rounded="lg">
      <v-card-title>Soraqçanın detalları</v-card-title>
      <v-divider class="mb-4" />
      <div class="pa-4 gap-2">
        <p>{{ viewedGuide.name }}</p>
        <p>{{ viewedGuide.service }}</p>
        <p>{{ viewedGuide.content }}</p>
      </div>
      <v-divider class="mt-2" />
      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
          class="text-none"
          rounded="xl"
          text="Dismiss"
          @click="closeViewModal"
        >
          Bağla
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  getAllGuides,
  createGuide,
  getGuideById,
} from "@/services/guideService";
import type { Guide } from "@/types/guide";

export default defineComponent({
  name: "Guides",
  setup() {
    const guides = ref<Guide[]>([]);

    const headers = ref([
      {
        align: "start",
        key: "name",
        sortable: false,
        title: "Adı",
      },
      { key: "service", title: "Operator/xidmət" },
      { key: "content", title: "Məzmun" },
      { key: "action", title: "" },
    ]);

    

    const fetchGuides = async () => {
      try {
        const data = await getAllGuides();
        guides.value = data;
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    const newGuideData = ref<Omit<Guide, "id">>({
      name: "",
      service: "",
      content: "",
    });

    const newGuide = async () => {
      try {
        const createdGuide = await createGuide(newGuideData.value);
        console.log("Guide successfully created:", createdGuide);
      } catch (error) {
        console.error("Error creating new guide:", error);
      }
    };


    const viewedGuide = ref<Guide[]>;

    const viewGuide = async() => {
      try {
        const data = await getGuideById(viewedGuide.id);
        viewedGuide = data

      } catch (error) {}
    };

    const isViewModalOpen = ref(false);

    const openViewModal = (item: Guide) => {
      viewedGuide.value = { ...item };
      isViewModalOpen.value = true;
    };

    const closeViewModal = () => {
      isViewModalOpen.value = false;
    };

    onMounted(fetchGuides);

    return {
      headers,
      guides,
      viewGuide,
      newGuideData,
      newGuide,
      isViewModalOpen,
      openViewModal,
      closeViewModal,
    };
  },
});
</script>
