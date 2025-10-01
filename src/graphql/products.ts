import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts(
    $title: String
    $price: Int
    $price_min: Int
    $price_max: Int
    $categoryId: Float
    $offset: Int
    $limit: Int
  ) {
    products(
      title: $title
      price: $price
      price_min: $price_min
      price_max: $price_max
      categoryId: $categoryId
      offset: $offset
      limit: $limit
    ) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;
