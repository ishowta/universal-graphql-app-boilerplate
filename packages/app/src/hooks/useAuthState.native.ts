import { useAuthState as useLibAuthState } from "@lukaselmer/react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import auth from "@react-native-firebase/auth";

export const useAuthState = () => {
  return useLibAuthState(
    //? A few difference types between react-native-firebase and firebase but almost certainly work
    (auth() as any) as firebase.auth.Auth
  );
};
