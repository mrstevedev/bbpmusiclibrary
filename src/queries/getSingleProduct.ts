export const GET_SINGLE_PRODUCT = `
    query SingleProduct($id: ID!, $idType: ProductIdTypeEnum!, $category: String) {
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
                attributes {
                    nodes {
                        name
                        options
                    }
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
        products(where: {category: $category}) {
            nodes {
            ... on SimpleProduct {
                name
                price
            }
            databaseId
            name
            slug
            }
        }
    }
`;
