import { GET_CATEGORIES_QUERY } from "@frontline/graphql/categories";
import { query } from "@frontline/libs/ApolloClient";
import { Category } from "@frontline/types/category";

export const getCategories = async (): Promise<Category[] | undefined> => {
  const { data } = await query<{ categories: Category[] }>({
    query: GET_CATEGORIES_QUERY,
    fetchPolicy: "cache-first",
  });

  return data?.categories;
};
