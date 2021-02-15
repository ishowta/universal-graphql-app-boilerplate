import React, { useCallback, useMemo } from "react";
import { RelayEnvironmentProvider } from "relay-hooks";
import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import { useToken } from "../hooks/firebase/useToken";
import { Platform } from "react-native";

let GRAPHQL_SERVER_URL = "";
if (Platform.OS === "web") {
  GRAPHQL_SERVER_URL = process.env.REACT_APP_GRAPHQL_SERVER_URL!;
} else {
  const env = require("react-native-dotenv");
  GRAPHQL_SERVER_URL = env.REACT_APP_GRAPHQL_SERVER_URL;
}

export const RelayProvider: React.FC = ({ children }) => {
  const [token] = useToken();

  const fetchQuery = useCallback<FetchFunction>(
    (operation, variables) => {
      return fetch(GRAPHQL_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          query: operation.text,
          variables,
        }),
      }).then((response) => {
        return response.json();
      });
    },
    [token]
  );

  const environment = useMemo(
    () =>
      new Environment({
        network: Network.create(fetchQuery),
        store: new Store(new RecordSource()),
      }),
    [fetchQuery]
  );

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
