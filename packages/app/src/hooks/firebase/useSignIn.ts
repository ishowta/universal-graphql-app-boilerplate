import { useFirebaseApp } from "../../providers/firebaseProvider";
import firebase from "firebase/app";
import "firebase/auth";
import { useCallback } from "react";

// TODO: Append several providerTags of auth
export const AuthProviderTagList = ["Google"] as const;
export type AuthProviderTag = typeof AuthProviderTagList[number];

export const useSignIn = () => {
  const app = useFirebaseApp();
  const signIn = useCallback(
    async (providerTag: AuthProviderTag): Promise<void> => {
      if (app == null) throw new Error();
      switch (providerTag) {
        case "Google": {
          const provider = new firebase.auth.GoogleAuthProvider();
          await app?.auth().signInWithPopup(provider);
          return;
        }
      }
    },
    [app]
  );
  return signIn;
};
