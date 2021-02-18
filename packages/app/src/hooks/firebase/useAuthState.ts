import type firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useFirebaseApp } from "../../providers/firebaseProvider";

import "firebase/auth";

export const useAuthState = () => {
  const app = useFirebaseApp();
  const [authState, setAuthState] = useState(app?.auth().currentUser);
  const [error, setError] = useState<firebase.auth.Error | null>(null);
  useEffect(() => {
    const unSubscribe = app?.auth().onAuthStateChanged(setAuthState, setError);
    if (unSubscribe)
      return () => {
        unSubscribe();
      };

    return undefined;
  }, [app]);

  return [authState, authState == null, error] as const;
};
