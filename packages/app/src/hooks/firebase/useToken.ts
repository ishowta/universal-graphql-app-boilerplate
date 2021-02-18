import type firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useAuthState } from "./useAuthState";

import "firebase/auth";

export const useToken = () => {
  const [authState, _, authStateError] = useAuthState();
  const [
    getTokenError,
    setGetTokenError,
  ] = useState<firebase.auth.Error | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    authState?.getIdToken().then(setToken).catch(setGetTokenError);
  }, [authState]);

  return [token, token == null, authStateError ?? getTokenError] as const;
};
