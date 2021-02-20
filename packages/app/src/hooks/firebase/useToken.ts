import type firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useAuthState } from "./useAuthState";

import "firebase/auth";

export const useToken = (): [
  string | null,
  boolean,
  firebase.auth.Error | null
] => {
  const [authState, isAuthStateLoading, authStateError] = useAuthState();

  const [
    getTokenError,
    setGetTokenError,
  ] = useState<firebase.auth.Error | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    authState?.getIdToken().then(setToken).catch(setGetTokenError);
  }, [authState]);

  return [
    token,
    isAuthStateLoading || token == null,
    authStateError ?? getTokenError,
  ];
};
