import { useEffect, useState } from "react";
import { useFirebaseApp } from "../../providers/firebaseProvider.native";
import { ReactNativeFirebase } from "@react-native-firebase/app";
import { useAuthState } from "./useAuthState.native";

export const useToken = () => {
  const app = useFirebaseApp();
  const [authState, _] = useAuthState();
  const [
    error,
    setError,
  ] = useState<ReactNativeFirebase.NativeFirebaseError | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    authState?.getIdToken().then(setToken).catch(setError);
  }, [authState]);

  return [token, token == null, error] as const;
};
