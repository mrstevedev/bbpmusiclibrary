export const GET_CONTACT_PAGE = `
  query Contact {
      page(id: 5960, idType: DATABASE_ID) {
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
