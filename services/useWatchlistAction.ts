import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiFetcher from "@/services/ApiFetcher";
import { addToWatchlistCache, removeFromWatchlistCache } from "./watchlistcache";


export const useWatchlistActions = (userEmail?: string) => {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: async (movieId: string) => {
      return ApiFetcher.post(`/p3/watch-list/?movie_id=${movieId}`);
    },

    onMutate: async (movieId) => {
      const movie = { movie_id: movieId }; // minimal optimistic object
      addToWatchlistCache(queryClient, movie);
      return { movie };
    },

    onError: (_err, movieId, context: any) => {
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