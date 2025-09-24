import { GET_PRODUCTS_QUERY } from "@frontline/graphql/products";
import { fetchGraphQL } from "@frontline/libs/apolloClient";
import { Product } from "@frontline/types/product";

export interface GetProductsParams {
  categoryId?: number;
  price?: number;
  price_min?: number;
  price_max?: number;
  offset?: number;
  limit?: number;
}

export async function getProducts(
  params: GetProductsParams
): Promise<Product[]> {
  const {
    categoryId,
    price,
    price_min,
    price_max,
    offset = 0,
    limit = 20,
  } = params;

  const variables = {
    offset,
    limit,
    ...(categoryId && { categoryId }),
    ...(price && { price }),
    ...(price_min && { price_min }),
    ...(price_max && { price_max }),
  };

  const data = await fetchGraphQL<{ products: Product[] }>({
    query: GET_PRODUCTS_QUERY,
    variables,
  });

  return data.products;
}
