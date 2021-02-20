import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { useFirebaseApp } from "../../providers/firebaseProvider.native";

export const useAuthState = (): [FirebaseAuthTypes.User | null, boolean] => {
  const app = useFirebaseApp();
  const [authState, setAuthState] = useState(app?.auth().currentUser);
  useEffect(() => {
    const unSubscribe = app?.auth().onAuthStateChanged(setAuthState);
    if (unSubscribe)
      return (): void => {
        unSubscribe();
      };

    return undefined;
  }, [app]);

  return [authState ?? null, authState == null];
};
