import { GoogleSignin } from "@react-native-community/google-signin";
import { AuthProviderTag } from "../screens/AuthScreen";
import firebaseAuth from "@react-native-firebase/auth";

export const auth = async (provider: AuthProviderTag): Promise<void> => {
  switch (provider) {
    case "Google": {
      GoogleSignin.configure();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = firebaseAuth.GoogleAuthProvider.credential(
        idToken
      );
      await firebaseAuth().signInWithCredential(googleCredential);
      return;
    }
  }
};
