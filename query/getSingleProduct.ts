export const GET_SINGLE_PRODUCT = `
    query SingleProduct($id: ID!, $idType: ProductIdTypeEnum!) {
        product(id: $id, idType: $idType) {
            ... on SimpleProduct {
                name
                downloadable
                databaseId
                price
                slug
                sku
                shortDescription(format: RAW)
                    productCategories {
                        nodes {
                            id
                            name
                        }
                    }
                    regularPrice
                    salePrice
                }
                description(format: RAW)
                image {
                    mediaItemUrl
                    id
                }
                related {
                    edges {
                        node {
                            id
                            name
                            slug
                        image {
                            mediaItemUrl
                        }
                    }
                }
            }
        }
    }
`;
