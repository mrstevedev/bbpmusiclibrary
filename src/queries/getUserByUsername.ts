export const GET_USER_BY_USERNAME = `
    query User($id: ID!) {
        user(id: $id, idType: USERNAME) {
            databaseId
        }
    }`;
