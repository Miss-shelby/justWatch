import ApiFetcher from "@/services/ApiFetcher"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export const useGetWatchlist = () => {
  return useQuery<any>({
    queryKey: ['watchlist'],
    queryFn: async () => {
      // 1. Get watchlist from your backend
      const response = await ApiFetcher.get("/p3/watch-list/");
     
      
      const  watchlist = (response as any).results;

      // 2. Fetch movie details from TMDB for each movie_id
      const movies = await Promise.all(
        watchlist.map(async (item: any) => {
          const movie = await axios.get(
            `${TMDB_BASE_URL}/movie/${item.WatchList.movie_id}`,
            { params: { api_key: TMDB_API_KEY } }
          );
          return {
            ...movie.data,
            watchlist_id: item.WatchList.watchlist_id,
            added_at: item.WatchList.added_at,
          };
        })
      );

      return movies;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });
};