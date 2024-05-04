/** Get a single customer orders */

export const GET_CUSTOMER_ORDERS = `
    query customer($id: ID, $customerId: Int) {
        customer(id: $id, customerId: $customerId) {
            firstName
            lastName
            email
            displayName
            databaseId
            orders {
                edges {
                    node {
                        lineItems {
                            nodes {
                                product {
                                name
                                databaseId
                                date
                                slug
                                sku
                                shortDescription
                                    ... on SimpleProduct {
                                        name
                                        price
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
