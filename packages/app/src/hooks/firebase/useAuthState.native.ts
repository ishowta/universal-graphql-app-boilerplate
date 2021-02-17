import { useEffect, useState } from "react";
import { useFirebaseApp } from "../../providers/firebaseProvider.native";

export const useAuthState = () => {
  const app = useFirebaseApp();
  const [authState, setAuthState] = useState(app?.auth().currentUser);
  useEffect(() => {
    const unSubscribe = app?.auth().onAuthStateChanged(setAuthState);
    if (unSubscribe) return () => unSubscribe();
    return undefined;
  }, [app]);

  return [authState, authState == null] as const;
};
