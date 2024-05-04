export const GET_VIDEOS_PAGE = `query GetMediaItemUrl {
    page(id: 32984, idType: DATABASE_ID) {
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
  }`;
