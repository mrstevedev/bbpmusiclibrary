export const GET_ORDERS_PAGE = `
    query GetMediaItemUrl {
        page(id: 6861 , idType: DATABASE_ID) {
        id
        title
        content
        featuredImage {
            node {
                id
                mediaItemUrl
                }
            }
        }
    }
`;
