export const GET_MEDIA_ITEM_URL = `
    query GetMediaItemUrl($id: ID!) {
        page(id: $id, idType: DATABASE_ID) {
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
