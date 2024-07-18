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
            name
            price
            databaseId
            regularPrice
            salePrice
            soldIndividually
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
