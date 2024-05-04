export const GET_PRODUCT_DOWNLOAD_URL = `
  query Products {
      products {
        edges {
          node {
            ... on SimpleProduct {
              name
              databaseId
              downloadable
              downloads {
                file
                name
              }
            }
          }
        }
      }
    }
  `;
