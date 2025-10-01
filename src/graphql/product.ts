import { gql } from "@apollo/client";

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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
