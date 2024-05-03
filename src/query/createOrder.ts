export const CREATE_ORDER = `
    mutation createOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
        orderId
        order {
            paymentMethod
            paymentMethodTitle
            status
            customer {
            databaseId
            }
            billing {
            firstName
            lastName
            address1
            city
            state
            postcode
            country
            email
            phone
            }
            lineItems {
            nodes {
                productId
                quantity
                total
            }
            }
            couponLines {
            nodes {
                code
            }
            }
        }
        }
    }
`;
