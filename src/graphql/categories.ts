import { gql } from "@apollo/client";

export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      image
    }
  }
`;

export const GET_CATEGORY_DETAILS_QUERY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      image
    }
  }
`;
