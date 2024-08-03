import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($after: String) {
    products(first: 12, after: $after, where: { category: "not individual" }) {
      edges {
        node {
          name
          link
          slug
          ... on SimpleProduct {
            name
            price
            databaseId
            salePrice
            regularPrice
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
