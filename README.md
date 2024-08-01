# BBP Music Library

BBPMusicLibrary is an E-Commerce storefront using Next.js 14 with Route Handlers to make requests to a graphql endpoint to create orders for sample packs that include wav files. Initial downloads come from wordpress, while subsequent downloads for lost files come from Amazon S3 via Signed URLs to keep links short lived.

Storefront built using:

1. Next.js 14 w/ Route Handlers
2. React-Bootstrap
3. Typescript
4. GraphQL Apollo

### Notes

To run this project locally:

1.  `git clone https://github.com/mrstevedev/bbpmusiclibrary.git`

2.  `yarn` to install dependencies.

3.  `yarn dev` to run the Next server.

4.  `yarn start` to start production build.

Open http://localhost:3000 with your browser to see the result.
