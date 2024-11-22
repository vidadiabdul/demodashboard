<template>
  <v-row>
    <v-col col="12" lg="6">
      <h4>Enerji obyekt növləri</h4>
    </v-col>
    <v-col col="12" lg="6" class="text-end">
      <v-btn variant="outlined" prepend-icon="mdi-filter-outline">
        Axtarış
      </v-btn>
      <v-btn
        variant="flat"
        prepend-icon="mdi-plus-box-outline"
        class="ms-3"
        color="#1F737F"
      >
        Əlavə et
        <v-dialog activator="parent" max-width="500">
          <template #default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title>Yeni soraqça</v-card-title>
              <v-divider class="mb-4" />
              <div class="pa-4 gap-2">
                <v-text-field
                  v-model="newGuideData.name"
                  hide-details="auto"
                  label="Soraqçanın adı"
                  variant="outlined"
                  color="#1C444D"
                />
                <v-text-field
                  v-model="newGuideData.service"
                  hide-details="auto"
                  label="Operator/Xidmət"
                  variant="outlined"
                  class="my-4"
                  color="#1C444D"
                />
                <v-text-field
                  v-model="newGuideData.content"
                  label="Məzmun"
                  variant="outlined"
                  color="#1C444D"
                />
              </div>
              <v-divider class="mt-2" />
              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn
                  class="text-none"
                  rounded="xl"
                  text="Bağla"
                  @click="isActive.value = false"
                />
                <v-btn
                  class="text-none"
                  color="#1F737F"
                  text="Yarat"
                  variant="flat"
                  @click="
                    () => {
                      newGuide();
                      isActive.value = false;
                    }
                  "
                />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
    </v-col>
  </v-row>
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
      <v-icon color="#454545" title="Edit" @click="openEditModal(item)">
        mdi-pencil-outline
      </v-icon>
    </template>
  </v-data-table>

  <!-- View Modal -->
  <v-dialog v-model="isViewModalOpen" max-width="500">
    <v-card rounded="lg">
      <v-card-title>Soraqçanın detalları</v-card-title>
      <v-divider class="mb-4" />
      <div>
      <v-row>
        <v-col col="12" lg="6">
          <v-list-item title="Adı" />
        </v-col>
        <v-col col="12" lg="6">
          <v-list-item :subtitle="viewedGuide.name" />
        </v-col>
      </v-row>
      <v-divider class="mx-4"/>
      <v-row>
        <v-col col="12" lg="6">
          <v-list-item title="Operator/xidmət" />
        </v-col>
        <v-col col="12" lg="6">
          <v-list-item :subtitle="viewedGuide.service" />
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row>
        <v-col col="12" lg="6">
          <v-list-item title="Məzmun" />
        </v-col>
        <v-col col="12" lg="6">
          <v-list-item :subtitle="viewedGuide.content" />
        </v-col>
      </v-row></div>
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

  <!-- Edit Modal -->
  <v-dialog v-model="isEditModalOpen" max-width="500">
    <v-card rounded="lg">
      <v-card-title>Soraqçanın redaktəsi</v-card-title>
      <v-divider class="mb-4" />
      <div class="pa-4 gap-2">
        <v-text-field
          v-model="editedGuide.name"
          hide-details="auto"
          label="Soraqçanın adı"
          variant="outlined"
          color="#1C444D"
        />
        <v-text-field
          v-model="editedGuide.service"
          hide-details="auto"
          label="Operator/Xidmət"
          variant="outlined"
          class="my-4"
          color="#1C444D"
        />
        <v-text-field
          v-model="editedGuide.content"
          label="Məzmun"
          variant="outlined"
          color="#1C444D"
        />
      </div>
      <v-divider class="mt-2" />
      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
          class="text-none"
          rounded="xl"
          text="Dismiss"
          @click="closeEditModal"
        >
          Dismiss
        </v-btn>
        <v-btn
          class="text-none"
          color="#1F737F"
          text="Update guide"
          variant="flat"
          @click="updateGuide"
        >
          Update guide
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
  updateGuideById,
} from "@/services/guideService";
import type { Guide } from "@/types/guide";

export default defineComponent({
  name: "Guides",
  setup() {
    // Get all guides functionality

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

    // New Guide functionality

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

    // View modal functionality
    const viewedGuide = ref<Guide | null>(null);

    const openViewModal = async (item: Guide) => {
      try {
        const data = await getGuideById(item.id);
        viewedGuide.value = data;
        isViewModalOpen.value = true;
      } catch (error) {
        console.error("Error fetching guide details:", error);
      }
    };
    const isViewModalOpen = ref(false);

    const closeViewModal = () => {
      isViewModalOpen.value = false;
    };

    // Edit modal functionality

    const editedGuide = ref<Guide | null>(null);

    const openEditModal = (item: Guide) => {
      editedGuide.value = { ...item };
      isEditModalOpen.value = true;
    };

    const updateGuide = async () => {
      if (editedGuide.value) {
        try {
          await updateGuideById(editedGuide.value.id, editedGuide.value);
          await fetchGuides();
          closeEditModal();
        } catch (error) {
          console.error("Error updating guide:", error);
        }
      }
    };
    const isEditModalOpen = ref(false);

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editedGuide.value = null;
    };

    onMounted(fetchGuides);

    return {
      headers,
      guides,
      viewedGuide,
      newGuideData,
      newGuide,
      isEditModalOpen,
      isViewModalOpen,
      editedGuide,
      openEditModal,
      closeEditModal,
      updateGuide,
      openViewModal,
      closeViewModal,
    };
  },
});
</script>
