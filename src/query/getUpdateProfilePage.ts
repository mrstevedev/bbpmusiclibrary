export const GET_UPDATE_INFO_PAGE = `
    query GetMediaItemUrl {
        page(id: 8688 , idType: DATABASE_ID) {
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
