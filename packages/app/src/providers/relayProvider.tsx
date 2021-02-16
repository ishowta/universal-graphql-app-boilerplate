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
import { env } from "../helpers/env";

export const RelayProvider: React.FC = ({ children }) => {
  const [token] = useToken();

  const fetchQuery = useCallback<FetchFunction>(
    (operation, variables) => {
      return fetch(env.REACT_APP_GRAPHQL_SERVER_URL!, {
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
