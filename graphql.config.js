module.exports = {
  schema: ["packages/graphql/schema.graphql"],
  // documents: ["packages/app/src/**/*.{graphql,js,ts,jsx,tsx}"], //TODO: Why
  extensions: {
    endpoints: {
      default: {
        url: "http://localhost:5000/graphql",
        headers: {
          // Can't set because firebase id token expired 1 hour
          /* Authorization: `Bearer ${process.env.API_TOKEN}` */
        },
      },
    },
  },
};
