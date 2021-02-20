import firebase from "firebase/app";
import { useCallback } from "react";
import { useFirebaseApp } from "../../providers/firebaseProvider";

import "firebase/auth";

// TODO: Append several providerTags of auth
export const AuthProviderTagList = ["Google"] as const;
export type AuthProviderTag = typeof AuthProviderTagList[number];

export const useSignIn = (): ((
  providerTag: AuthProviderTag
) => Promise<firebase.auth.UserCredential>) => {
  const app = useFirebaseApp();
  const signIn = useCallback(
    async (providerTag: AuthProviderTag) => {
      if (app == null)
        throw new Error(
          "Firebase failed to initialize with unknown error (`useFirebaseApp() == null`)"
        );
      switch (providerTag) {
        case "Google": {
          const provider = new firebase.auth.GoogleAuthProvider();

          return app.auth().signInWithPopup(provider);
        }
      }
    },
    [app]
  );

  return signIn;
};
