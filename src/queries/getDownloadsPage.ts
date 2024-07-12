export const GET_DOWNLOADS_PAGE = `
    query GetMediaItemUrl {
        page(id: 958 , idType: DATABASE_ID) {
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
