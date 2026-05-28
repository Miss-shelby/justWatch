import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiFetcher from "@/services/ApiFetcher";
import { addToWatchlistCache, removeFromWatchlistCache } from "./watchlistcache";


export const useWatchlistActions = (userEmail?: string) => {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: async (movieInput: any) => {
      const movieId = typeof movieInput === 'string' ? movieInput : movieInput.id;
      return ApiFetcher.post(`/p3/watch-list/?movie_id=${movieId}`);
    },

    onMutate: async (movieInput: any) => {
      const movieId = typeof movieInput === 'string' ? movieInput : movieInput.id;
      const movieObj = typeof movieInput === 'string' ? { movie_id: movieId } : {
        movie_id: movieId,
        original_title: movieInput.original_title,
        poster_path: movieInput.poster_path,
        release_date: movieInput.release_date,
        vote_average: movieInput.vote_average,
      };
      
      addToWatchlistCache(queryClient, movieObj);
      return { movieId };
    },

    onError: (_err, movieInput: any, context: any) => {
      const movieId = typeof movieInput === 'string' ? movieInput : movieInput.id;
      removeFromWatchlistCache(queryClient, movieId);
    },
  });

  const remove = useMutation({
    mutationFn: async (watchlistId: string) => {
      return ApiFetcher.delete(
        `/p3/watch-list/${watchlistId}?email=${userEmail}`
      );
    },

    onMutate: async (watchlistId) => {
      removeFromWatchlistCache(queryClient, watchlistId);
      return { watchlistId };
    },

    onError: (_err, watchlistId) => {
      // rollback is optional if you store snapshot
    },
  });

  return { add, remove };
};