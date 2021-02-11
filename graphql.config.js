module.exports = {
  schema: ["packages/graphql/schema.graphql"],
  //documents: ["packages/app/src/**/*.{graphql,js,ts,jsx,tsx}"],
  extensions: {
    endpoints: {
      default: {
        url: "http://localhost:5000/graphql",
        headers: {
          /*Authorization: `Bearer ${process.env.API_TOKEN}`*/
        },
      },
    },
  },
};
