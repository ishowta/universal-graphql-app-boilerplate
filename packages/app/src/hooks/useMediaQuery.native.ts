import { useMediaQuery as useLibraryMediaQuery } from "react-responsive";

export const useMediaQuery = (
  mediaQuery: string
): ReturnType<typeof useLibraryMediaQuery> => {
  return useLibraryMediaQuery({
    query: mediaQuery,
  });
};
