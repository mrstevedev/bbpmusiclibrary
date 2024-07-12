export const CREATE_USER = `
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            user {
                databaseId
                firstName
                lastName
                username
                email
            }
        }
    }
`;
