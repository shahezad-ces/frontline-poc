import { GET_PRODUCT_QUERY } from "@frontline/graphql/product";
import { GET_PRODUCTS_QUERY } from "@frontline/graphql/products";
import { query } from "@frontline/libs/ApolloClient";
import { Product } from "@frontline/types/product";

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
  const { data } = await query<{ product: Product }>({
    query: GET_PRODUCT_QUERY,
    variables: { id: productId },
    fetchPolicy: "cache-first",
  });

  return data?.product;
};
