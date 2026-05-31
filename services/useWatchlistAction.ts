import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiFetcher from "@/services/ApiFetcher";
import { addToWatchlistCache, removeFromWatchlistCache } from "./watchlistcache";


export const useWatchlistActions = (userEmail?: string) => {
  const queryClient = useQueryClient();
  //  This gives you access to React Query's memory, allowing you to manually read or change the cached data.

  const add = useMutation({
    mutationFn: async (movieInput: any) => {
      const movieId = typeof movieInput === 'string' ? movieInput : movieInput.id;
      return ApiFetcher.post(`/p3/watch-list/?movie_id=${movieId}`);
    },

    //this runs before mutation function and calls the addToWatchlistCache() to update the ui  with the item we are trying to add to ui before the request is sent to the server (optimistic updates), so whether we pass movie object or id to the add function here, the addToWatchlistCache() will use to update the cache before request hit, if its only id then other object will be empty .   
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

    //this runs if the mutation function fails  and remove the fake ui we added previously 
    onError: (_err, movieInput: any, context: any) => {
      const movieId = typeof movieInput === 'string' ? movieInput : movieInput.id;
      removeFromWatchlistCache(queryClient, movieId);
    },

    onSettled: () => {
      // Invalidate the cache to trigger a silent background refetch
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });

  const remove = useMutation({
    //runs to update the server 
    mutationFn: async (watchlistId: string) => {
      return ApiFetcher.delete(
        `/p3/watch-list/${watchlistId}?email=${userEmail}`
      );
    },

    //runs before the remove mutationfn and update the ui before we send request to the server 
    onMutate: async (watchlistId) => {
      removeFromWatchlistCache(queryClient, watchlistId);
      return { watchlistId };
    },

    onError: (_err, watchlistId) => {
      // rollback is optional if you store snapshot
    },

    onSettled: () => {
      // Invalidate the cache to trigger a silent background refetch
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });

  return { add, remove };
};

// This file is the "Coordinator". It bridges the gap between your local mini-database (watchlistcache.ts) and your actual remote server API.