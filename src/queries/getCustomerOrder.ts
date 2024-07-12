export const GET_CUSTOMER_ORDER = `
    query Order($id: ID!) {
        order(id: $id, idType: DATABASE_ID) {
            downloadableItems {
                edges {
                    node {
                        url
                        download {
                        file
                        }
                    }
                }
            }
        }
    }
`;
