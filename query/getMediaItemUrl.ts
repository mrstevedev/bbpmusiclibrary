export const GET_MEDIA_ITEM_URL = `
    query GetMediaItemUrl {
        page(id: 6412 , idType: DATABASE_ID) {
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
