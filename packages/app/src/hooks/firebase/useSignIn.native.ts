import { GoogleSignin } from "@react-native-community/google-signin";
import firebaseAuth from "@react-native-firebase/auth";
import { ReactNativeFirebase } from "@react-native-firebase/app";
import { useFirebaseApp } from "../../providers/firebaseProvider.native";

// TODO: Append several providerTags of auth
export type AuthProviderTag =
  //  | "Apple"
  //  | "Facebook"
  //  | "Twitter"
  "Google";
//  | "PhoneNumber"
//  | "EmailAndPassword"
//  | "Guest"

export const useSignIn = async (provider: AuthProviderTag): Promise<void> => {
  const app = useFirebaseApp();
  switch (provider) {
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
};
