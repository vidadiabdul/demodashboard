import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import type { Guide } from "../types/guide";

const baseUrl = import.meta.env.VITE_GUIDE_API_URL;

const guideService = {
  // Fetch all guides
  useGetAllGuides: () => {
    return useQuery({
      queryKey: ["guides"],
      queryFn: async () => {
        const { data } = await axios.get<Guide[]>(`${baseUrl}?action=getAllGuides`);
        return data;
      },
    });
  },

  // Fetch a guide by ID
  useGetGuideById: (id: number) => {
    return useQuery({
      queryKey: ["guide", id],
      queryFn: async () => {
        const { data } = await axios.get<Guide>(`${baseUrl}?action=getGuideById&id=${id}`);
        return data;
      },
      enabled: !!id, // Fetch only if ID is provided
    });
  },

  // Create a new guide
  useCreateGuide: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (data: Omit<Guide, "id">) => {
        const { data: responseData } = await axios.post(`${baseUrl}?action=createGuide`, data);
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["guides"]); // Refresh guides list after successful creation
      },
    });
  },

  // Update a guide by ID
  useUpdateGuideById: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: number;
        data: Partial<Omit<Guide, "id">>;
      }) => {
        const { data: responseData } = await axios.put(`${baseUrl}?action=updateGuideById`, {
          id,
          ...data,
        });
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["guides"]); // Refresh guides list after update
      },
    });
  },

  // Delete a guide by ID
  useDeleteGuideById: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (id: number) => {
        const { data } = await axios.delete(`${baseUrl}?action=deleteGuideById&id=${id}`);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["guides"]); // Refresh guides list after deletion
      },
    });
  },
};

export default guideService;
