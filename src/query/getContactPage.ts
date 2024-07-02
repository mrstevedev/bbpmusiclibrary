export const GET_CONTACT_PAGE = `
  query Contact($id: ID!) {
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
