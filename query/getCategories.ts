export const GET_CATEGORIES = `
    query Category($id: ID!, $idType: ProductCategoryIdType! ) {
        productCategory(id: $id, idType: $idType) {
        products {
            nodes {
            name
            image {
                mediaItemUrl
            }
            description(format: RAW)
            slug
            ... on SimpleProduct {
                price
            }
            }
        }
        name
        }
    }
`;
