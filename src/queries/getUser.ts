export const GET_USER = `
    query User($id: ID!) {
        user(id: $id, idType: EMAIL) {
            databaseId
        }
    }`;
