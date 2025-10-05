import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_DETAILS_QUERY,
} from "@frontline/graphql";
import { query } from "@frontline/libs/ApolloClient";
import type { Product } from "@frontline/types";

export interface GetProductsParams {
  categoryId?: number;
  price?: number;
  price_min?: number;
  price_max?: number;
  offset?: number;
  limit?: number;
}

export const getProducts = async (
  params: GetProductsParams
): Promise<Product[] | undefined> => {
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
    ...(categoryId !== undefined && { categoryId }),
    ...(price !== undefined && { price }),
    ...(price_min !== undefined && { price_min }),
    ...(price_max !== undefined && { price_max }),
  };

  const { data } = await query<{ products: Product[] }>({
    query: GET_PRODUCTS_QUERY,
    variables,
    fetchPolicy: "cache-first",
  });

  return data?.products;
};

export const getProductDetails = async (
  productId: number
): Promise<Product | undefined> => {
  try {
    const { data } = await query<{ product: Product }>({
      query: GET_PRODUCT_DETAILS_QUERY,
      variables: { id: productId },
      fetchPolicy: "cache-first",
    });

    return data?.product;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return undefined; // fallback
  }
};
