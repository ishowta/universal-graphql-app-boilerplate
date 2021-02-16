import { GoogleSignin } from "@react-native-community/google-signin";
import firebaseAuth from "@react-native-firebase/auth";
import { ReactNativeFirebase } from "@react-native-firebase/app";
import { useFirebaseApp } from "../../providers/firebaseProvider.native";
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
          GoogleSignin.configure();
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = firebaseAuth.GoogleAuthProvider.credential(
            idToken
          );
          await app?.auth().signInWithCredential(googleCredential);
          return;
        }
      }
    },
    [app]
  );
  return signIn;
};
