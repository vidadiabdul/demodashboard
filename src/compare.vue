<script setup lang="ts">
import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import guideService from "@/services/guideService";
import type { Guide } from "@/types/guide";
import DialogWrapper from "../components/DialogWrapper.vue";

const modalStates = ref<{ [key: string]: boolean }>({
  add: false,
  view: false,
  edit: false,
});

const openModal = (modalName: string) => {
  modalStates.value[modalName] = true;
};

const closeModal = (modalName: string) => {
  modalStates.value[modalName] = false;
  if (modalName === "edit") {
    editedGuide.value = null;
  }
};

const isModalOpen = (modalName: string) => !!modalStates.value[modalName];

const queryClient = useQueryClient();

const headers = ref([
  { align: "start", key: "name", sortable: false, title: "Adı" },
  { key: "service", title: "Operator/xidmət" },
  { key: "content", title: "Məzmun" },
  { key: "action", title: "" },
]);

const { data: guides } = guideService.useGetAllGuides();

const newGuideData = ref<Omit<Guide, "id">>({
  name: "",
  service: "",
  content: "",
});

const createGuideMutation = guideService.useCreateGuide();

const validateGuide = (guide: Partial<Guide>) => {
  return guide.name && guide.service && guide.content;
};

const createNewGuide = () => {
  if (!validateGuide(newGuideData.value)) {
    console.error("All fields are required!");
    return;
  }
  createGuideMutation.mutate(newGuideData.value, {
    onSuccess: () => {
      queryClient.invalidateQueries(["guides"]);
      newGuideData.value = { name: "", service: "", content: "" };
      closeModal("add");
    },
  });
};

const viewedGuide = ref<Guide | null>(null);

const viewGuide = async (id: number) => {
  try {
    const guide = await guideService.useGetGuideById(id).data?.value;
    if (guide) {
      viewedGuide.value = guide;
      openModal("view");
    }
  } catch (error) {
    console.error("Failed to fetch guide details:", error);
  }
};

const editedGuide = ref<Guide | null>(null);

const openEditModal = (item: Guide) => {
  editedGuide.value = { ...item };
  openModal("edit");
};

const updateGuideMutation = guideService.useUpdateGuideById();

const updateGuide = () => {
  if (!editedGuide.value || !validateGuide(editedGuide.value)) {
    console.error("All fields are required!");
    return;
  }
  updateGuideMutation.mutate(
    { id: editedGuide.value.id, data: editedGuide.value },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["guides"]);
        closeModal("edit");
      },
    }
  );
};

const deleteGuideMutation = guideService.useDeleteGuideById();

const deleteGuide = async (id: number) => {
  try {
    await deleteGuideMutation.mutateAsync(id);
    queryClient.invalidateQueries(["guides"]);
  } catch (error) {
    console.error("Failed to delete guide:", error);
  }
};
</script>
