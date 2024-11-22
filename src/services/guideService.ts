import axios from "axios";
import type { Guide } from "../types/guide";

const baseUrl = "https://naturepulse.xyz/api/guide";

// Create a new guide
export const createGuide = async (
  data: Omit<Guide, "id">
): Promise<Guide | void> => {
  try {
    const resp = await axios.post<Guide>(`${baseUrl}?action=createGuide`, data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

// Get all guides
export const getAllGuides = async (): Promise<Guide[] | void> => {
  try {
    const resp = await axios.get<{ status: string; data: Guide[] }>(
      `${baseUrl}?action=getAllGuides`
    );
    return resp.data.data;
  } catch (error) {
    console.log(error);
  }
};

// Get a guide by ID
export const getGuideById = async (id: number): Promise<Guide | void> => {
  try {
    const resp = await axios.get<{ status: string; data: Guide }>(
      `${baseUrl}?action=getGuideById&id=${id}`
    );
    return resp.data.data;
  } catch (error) {
    console.log(error);
  }
};

// Delete a guide by ID
export const deleteGuideById = async (
  id: number
): Promise<{ status: string; message: string } | void> => {
  try {
    const resp = await axios.delete<{ status: string; message: string }>(
      `${baseUrl}?action=deleteGuideById`,
      {
        data: { id },
      }
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

// Update a guide by ID
export const updateGuideById = async (
  id: number,
  data: Partial<Omit<Guide, "id">>
): Promise<Guide | void> => {
  try {
    const resp = await axios.put<Guide>(`${baseUrl}?action=updateGuideById`, {
      id,
      ...data,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
