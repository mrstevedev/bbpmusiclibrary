export const GET_CUSTOMER_DOWNLOADS = `
  query Customer($customerId: Int!) {
    customer(customerId: $customerId) {
      email
      databaseId
      downloadableItems {
        edges {
          node {
            downloadId
            name
            url
            download {
              file
              name
            }
            accessExpires
            product {
              name
            }
          }
        }
      }
      orders {
        edges {
          node {
            databaseId
            datePaid
          }
        }
      }
    }
  }
`;
