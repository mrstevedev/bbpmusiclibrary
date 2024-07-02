export const CREATE_ORDER = `
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
        orderId
        order {
            paymentMethod
            paymentMethodTitle
            status
            customer {
            databaseId
            role
            username
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
