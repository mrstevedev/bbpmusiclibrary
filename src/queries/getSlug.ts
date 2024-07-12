export const GET_SLUG = `
    query getSlug {
        products(first: 12) {
            nodes {
                slug
            }
        }
    }  
`;
