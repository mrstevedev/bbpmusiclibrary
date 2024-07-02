export const GET_S3_SIGNED_URL = `
query Customer($customerId: Int!) {
    customer(customerId: $customerId) {
      email
      databaseId
      orders {
        edges {
          node {
            databaseId
            datePaid
            downloadableItems {
              edges {
                node {
                    product {
                        databaseId
                    }
                  download {
                    file
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
