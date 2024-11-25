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
        @click="openModal('add')"
      >
        Əlavə et
      </v-btn>
    </v-col>
  </v-row>

  <v-data-table :headers="headers" :items="guides" class="mt-4" item-value="id">
    <template #item.action="{ item }">
      <v-icon
        class="me-2"
        color="#454545"
        title="View"
        @click="() => viewGuide(item.id)"
      >
        mdi-eye-outline
      </v-icon>
      <v-icon
        color="#454545"
        title="Edit"
        @click="() => openModal('edit', item)"
      >
        mdi-pencil-outline
      </v-icon>
      <v-icon
        color="red"
        class="ms-2"
        title="Delete"
        @click="() => deleteGuide(item.id)"
      >
        mdi-delete-outline
      </v-icon>
    </template>
  </v-data-table>

  <!-- Dialog for Add -->
  <DialogWrapper
    v-if="modalStates.add"
    v-model="modalStates.add"
    title="Yeni soraqça"
  >
    <template #content>
      <div class="px-4">
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
    </template>
    <template #actions>
      <v-btn
        class="text-none"
        rounded="xl"
        text="Bağla"
        @click="closeModal('add')"
      />
      <v-btn
        class="text-none"
        color="#1F737F"
        text="Yarat"
        variant="flat"
        @click="createNewGuide"
      />
    </template>
  </DialogWrapper>

  <!-- Dialog for View -->
  <DialogWrapper
    v-if="modalStates.view"
    v-model="modalStates.view"
    title="Soraqçanın detalları"
  >
    <template #content>
      <v-row>
        <v-col col="12" lg="6">
          <v-list-item title="Adı" />
        </v-col>
        <v-col col="12" lg="6">
          <v-list-item :subtitle="viewedGuide?.name" />
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row>
        <v-col col="12" lg="6">
          <v-list-item title="Operator/xidmət" />
        </v-col>
        <v-col col="12" lg="6">
          <v-list-item :subtitle="viewedGuide?.service" />
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row>
        <v-col col="12" lg="6">
          <v-list-item title="Məzmun" />
        </v-col>
        <v-col col="12" lg="6">
          <v-list-item :subtitle="viewedGuide?.content" />
        </v-col>
      </v-row>
    </template>
  </DialogWrapper>

  <!-- Dialog for Edit -->
  <DialogWrapper
    v-if="modalStates.edit"
    v-model="modalStates.edit"
    title="Soraqçanın redaktəsi"
  >
    <template #content>
      <div class="px-4">
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
    </template>
    <template #actions>
      <v-btn
        class="text-none"
        rounded="xl"
        text="Dismiss"
        @click="closeModal('edit')"
      />
      <v-btn
        class="text-none"
        color="#1F737F"
        text="Update guide"
        variant="flat"
        @click="updateGuide"
      />
    </template>
  </DialogWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import guideService from "@/services/guideService";
import type { Guide } from "@/types/guide";
import DialogWrapper from "../components/DialogWrapper.vue";

// Constants for modal keys
const ModalKeys = {
  ADD: "add",
  VIEW: "view",
  EDIT: "edit",
} as const;

// Modal State Management
const modalStates = ref<Record<string, boolean>>({
  [ModalKeys.ADD]: false,
  [ModalKeys.VIEW]: false,
  [ModalKeys.EDIT]: false,
});

const openModal = (modalName: string, guide?: Guide) => {
  if (modalName === ModalKeys.EDIT && guide) {
    editedGuide.value = { ...guide };
  }
  modalStates.value[modalName] = true;
};

const closeModal = (modalName: string) => {
  modalStates.value[modalName] = false;
};

// Guide Table Headers
const headers = ref([
  { align: "start", key: "name", sortable: false, title: "Adı" },
  { key: "service", title: "Operator/xidmət" },
  { key: "content", title: "Məzmun" },
  { key: "action", title: "" },
]);

// Query Client
const queryClient = useQueryClient();

// Fetch Guides
const { data: guides } = guideService.getAll();

// Add New Guide
const newGuideData = ref<Omit<Guide, "id">>({
  name: "",
  service: "",
  content: "",
});

const createGuideMutation = guideService.create();

const createNewGuide = () => {
  createGuideMutation.mutate(newGuideData.value, {
    onSuccess: () => {
      queryClient.invalidateQueries(["guides"]);
      newGuideData.value = { name: "", service: "", content: "" };
      closeModal(ModalKeys.ADD);
    },
  });
};

// View Guide Details
const guideId = ref<number | null>(null);
const viewedGuide = ref<Guide | null>(null);
const { data: guideDetails, refetch: fetchGuide } = guideService.getById(guideId);

const viewGuide = async (id: number) => {
  guideId.value = id;
  try {
    await fetchGuide();
    viewedGuide.value = guideDetails.value;
    openModal(ModalKeys.VIEW);
  } catch (error) {
    console.error("Failed to fetch guide details:", error);
  }
};

// Edit Guide
const editedGuide = ref<Partial<Guide>>({
  name: "",
  service: "",
  content: "",
});

const updateGuideMutation = guideService.update();

const updateGuide = () => {
  if (editedGuide.value?.id) {
    updateGuideMutation.mutate(
      { id: editedGuide.value.id, data: editedGuide.value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["guides"]);
          closeModal(ModalKeys.EDIT);
        },
      }
    );
  }
};

// Delete Guide
const deleteGuideMutation = guideService.delete();

const deleteGuide = (id: number) => {
  if (confirm("Are you sure you want to delete this guide?")) {
    deleteGuideMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["guides"]);
      },
      onError: (error) => {
        console.error("Failed to delete guide:", error);
      },
    });
  }
};
</script>
