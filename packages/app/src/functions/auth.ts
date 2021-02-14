import firebase from "firebase/app";
import "firebase/auth";
import { AuthProviderTag } from "../screens/AuthScreen";

export const auth = async (providerTag: AuthProviderTag): Promise<void> => {
  switch (providerTag) {
    case "Google": {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      return;
    }
  }
};
