import { GET_PRODUCTS_QUERY } from "@frontline/graphql/products";
import { fetchGraphQL } from "@frontline/libs/apolloClient";
import { Product } from "@frontline/types/product";

export async function getProducts(): Promise<Product[]> {
  const variables = {
    offset: 0,
    limit: 20,
  };

  const data = await fetchGraphQL<{ products: Product[] }>({
    query: GET_PRODUCTS_QUERY,
    variables,
  });

  return data.products;
}
