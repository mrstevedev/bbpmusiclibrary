export const GET_ABOUT_PAGE = `
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
