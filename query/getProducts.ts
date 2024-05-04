import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($after: String) {
    products(first: 12, after: $after) {
      edges {
        node {
          name
          link
          slug
          ... on SimpleProduct {
            id
            name
            price
            regularPrice
            salePrice
          }
          image {
            mediaItemUrl
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
`;
