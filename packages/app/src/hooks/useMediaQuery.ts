import { useMediaQuery as useLibraryMediaQuery } from "beautiful-react-hooks";

export const useMediaQuery = (mediaQuery: string) => {
  return useLibraryMediaQuery(mediaQuery);
};
