export const GET_COUPONS = `
    query Coupons {
        coupons {
            edges {
                node {
                id
                code
                amount
                description
                usageCount
                usageLimit
                usageLimitPerUser
                    usedBy {
                        nodes {
                            id
                        }
                    }
                }
            }
        }
    }
`;
