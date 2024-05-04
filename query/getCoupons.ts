export const GET_COUPONS = `
    query Coupons {
        coupons {
            edges {
                node {
                code
                amount
                description
                }
            }
        }
    }
`;
