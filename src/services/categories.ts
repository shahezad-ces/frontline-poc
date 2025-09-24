import { GET_CATEGORIES_QUERY } from "@frontline/graphql/categories";
import { fetchGraphQL } from "@frontline/libs/apolloClient";
import { Category } from "@frontline/types/category";

export async function getCategories(): Promise<Category[]> {
  const data = await fetchGraphQL<{ categories: Category[] }>({
    query: GET_CATEGORIES_QUERY,
    variables: {},
  });

  return data.categories;
}
