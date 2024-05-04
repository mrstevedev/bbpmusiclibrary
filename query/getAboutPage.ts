export const GET_ABOUT_PAGE = `query GetMediaItemUrl {
    page(id: 595, idType: DATABASE_ID) {
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
