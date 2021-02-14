import { useAuthState as useLibAuthState } from "@lukaselmer/react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";

export const useAuthState = () => {
  return useLibAuthState(firebase.auth());
};
