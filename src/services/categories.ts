import {
  GET_CATEGORIES_QUERY,
  GET_CATEGORY_DETAILS_QUERY,
} from "@frontline/graphql";
import { query } from "@frontline/libs/ApolloClient";
import { Category } from "@frontline/types";

export const getCategories = async (): Promise<Category[] | undefined> => {
  const { data } = await query<{ categories: Category[] }>({
    query: GET_CATEGORIES_QUERY,
    fetchPolicy: "cache-first",
  });

  return data?.categories;
};

export const getCategoryDetails = async (
  id: number
): Promise<Category | undefined> => {
  if (!id) return undefined;
  const { data } = await query<{ category: Category }>({
    query: GET_CATEGORY_DETAILS_QUERY,
    variables: { id },
    fetchPolicy: "cache-first",
  });

  return data?.category;
};
