import { GoogleSignin } from "@react-native-community/google-signin";
import firebaseAuth from "@react-native-firebase/auth";
import { useCallback } from "react";
import { useFirebaseApp } from "../../providers/firebaseProvider.native";

// TODO: Append several providerTags of auth
export const AuthProviderTagList = ["Google"] as const;
export type AuthProviderTag = typeof AuthProviderTagList[number];

export const useSignIn = () => {
  const app = useFirebaseApp();
  const signIn = useCallback(
    async (providerTag: AuthProviderTag): Promise<void> => {
      if (app == null)
        throw new Error(
          "Firebase failed to initialize with unknown error (`useFirebaseApp() == null`)"
        );
      switch (providerTag) {
        case "Google": {
          GoogleSignin.configure();
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = firebaseAuth.GoogleAuthProvider.credential(
            idToken
          );
          await app?.auth().signInWithCredential(googleCredential);
        }
      }
    },
    [app]
  );

  return signIn;
};
