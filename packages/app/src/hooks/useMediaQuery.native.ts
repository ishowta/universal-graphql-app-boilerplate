import { useMediaQuery as useLibraryMediaQuery } from "react-responsive";

export const useMediaQuery = (mediaQuery: string) => {
  return useLibraryMediaQuery({
    query: mediaQuery,
  });
};
