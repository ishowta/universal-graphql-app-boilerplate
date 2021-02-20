import { useMediaQuery as useLibraryMediaQuery } from "beautiful-react-hooks";

export const useMediaQuery = (
  mediaQuery: string
): ReturnType<typeof useLibraryMediaQuery> => {
  return useLibraryMediaQuery(mediaQuery);
};
