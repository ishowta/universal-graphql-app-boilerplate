import React, { useCallback, useMemo } from "react";
import { RelayEnvironmentProvider } from "relay-hooks";
import type { FetchFunction } from "relay-runtime";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { environment } from "../helpers/environment";
import { useToken } from "../hooks/firebase/useToken";

export const RelayProvider: React.FC = ({ children }) => {
  const [token] = useToken();

  const fetchQuery = useCallback<FetchFunction>(
    (operation, variables) => {
      if (environment.REACT_APP_GRAPHQL_SERVER_URL == null) {
        throw new Error("environment REACT_APP_GRAPHQL_SERVER_URL not found");
      }

      return fetch(environment.REACT_APP_GRAPHQL_SERVER_URL, {
        body: JSON.stringify({
          query: operation.text,
          variables,
        }),
        headers: {
          authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((response) => {
        return response.json();
      });
    },
    [token]
  );

  const relayEnvironment = useMemo(() => {
    return new Environment({
      network: Network.create(fetchQuery),
      store: new Store(new RecordSource()),
    });
  }, [fetchQuery]);

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
