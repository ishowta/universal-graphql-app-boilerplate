import React from "react";
import { Text } from "react-native";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../relay";
import { UsersQuery } from "./__generated__/UsersQuery.graphql";
class Users extends React.Component {
  // defined or imported above...
  render() {
    return (
      <QueryRenderer<UsersQuery>
        environment={environment}
        query={graphql`
          query UsersQuery {
            users {
              nodes {
                id
                nodeId
              }
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <Text>{error.message}</Text>;
          }
          if (!props) {
            return <Text>Loading...</Text>;
          }
          return <Text>User ID: {props.users?.nodes[0].id}</Text>;
        }}
      />
    );
  }
}

export default Users;
