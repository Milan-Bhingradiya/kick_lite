import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constant";
import {
  Category,
  getCategoryInfoFromNameResponse,
  getLivestreamsDataForCardResponse,
  getTopCategoriesResponse,
} from "../types";

export async function getTopCategoriesNames(): Promise<Category[]> {
  try {
    const { data } = await axios.get<Category[]>(
      `${BASE_URL}/api/v1/categories`
      // {
      // headers: {
      //   Authorization: `Bearer ${cookies.get("centralTPOToken")}`,
      // },
      // }
    );
    return data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.response?.data as Category[];
  }
}

export async function getTopCategories(): Promise<getTopCategoriesResponse> {
  try {
    const { data } = await axios.get<getTopCategoriesResponse>(
      `${BASE_URL}/api/v1/categories/top`
      // {
      // headers: {
      //   Authorization: `Bearer ${cookies.get("centralTPOToken")}`,
      // },
      // }
    );
    return data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.response?.data as getTopCategoriesResponse;
  }
}

export async function getLivestreamsDataForCard(
  category: string,
  limit = 14,
  sort = "featured"
) {
  try {
    const { data } = await axios.get<getLivestreamsDataForCardResponse>(
      `${BASE_URL}/stream/livestreams/en?limit=${limit}&sort=${sort}&category=${category}`
    );
    return data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.response?.data as getLivestreamsDataForCardResponse;
  }
}

export async function getCategoryInfoFromName(categoryName: string) {
  try {
    const { data } = await axios.get<getCategoryInfoFromNameResponse>(
      `${BASE_URL}/api/v1/subcategories/${categoryName}`
    );
    return data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.response?.data as getCategoryInfoFromNameResponse;
  }
}
