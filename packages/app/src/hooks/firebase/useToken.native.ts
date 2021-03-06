import type { ReactNativeFirebase } from "@react-native-firebase/app";
import { useEffect, useState } from "react";
import { useAuthState } from "./useAuthState.native";

export const useToken = (): [
  string | null,
  boolean,
  ReactNativeFirebase.NativeFirebaseError | null
] => {
  const [authState] = useAuthState();
  const [
    error,
    setError,
  ] = useState<ReactNativeFirebase.NativeFirebaseError | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    authState?.getIdToken().then(setToken).catch(setError);
  }, [authState]);

  return [token, token == null, error];
};
