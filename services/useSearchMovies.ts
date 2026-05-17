import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search-movies", query],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query,
          page: pageParam,
        }
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      // stop fetching when we reach the last page
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query, // only fetch when user has typed something
  });
};

// getNextPageParam is used internally by React Query — you don't call it yourself. It runs automatically after every page fetch to figure out what the next page number should be. It reads lastPage.page and lastPage.total_pages from the TMDB response which looks like:
// So it just checks — "is there a next page?" and returns the next page number or undefined to stop.

// 2️⃣
// fetchNextPage, hasNextPage, isFetchingNextPage come from useInfiniteQuery — they are returned by the hook just like data and isLoading:

// const { 
//   data,               // all fetched pages
//   fetchNextPage,      // function to fetch the next page
//   hasNextPage,        // true if there are more pages
//   isFetchingNextPage, // true while next page is loading
//   isLoading,          // true on first load
//   error
// } = useSearchMovies(query)

// fetchNextPage → you call this inside onEndReached to trigger loading the next page
// hasNextPage → React Query calculates this from getNextPageParam — if it returns undefined, hasNextPage is false
// isFetchingNextPage → use this to show a loading spinner at the bottom of the list
