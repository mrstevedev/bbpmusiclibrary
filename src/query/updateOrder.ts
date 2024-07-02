export const UPDATE_ORDER = `
    mutation UpdateOrder($input: UpdateOrderInput!) {
        updateOrder(input: $input) {
            order {
                databaseId
                status
            }
        }
    }
`;
