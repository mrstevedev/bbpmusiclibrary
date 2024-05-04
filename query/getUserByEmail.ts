export const GET_USER_BY_EMAIL = `
    query User($id: ID!) {
        user(id: $id, idType: EMAIL) {
            databaseId
        }
    }`;
