import { EventCategory } from "@/utils/interfaces/Categories";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
      const response = await axios.get<EventCategory[]>(`/api/categories`);
      return response.data;
    }
);