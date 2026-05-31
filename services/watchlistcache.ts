// a function that adds items to our watchlist cache, it first checks if the item already exists in the cache and if it does, it returns the old list without the item, otherwise it adds the new item to the list, mind you this adds to the cache only not to the server and this is displyed to the use from cache, but when refreshed it will fetch from the server and the change will be lost 
export const addToWatchlistCache = (queryClient: any, item: any) => {
  queryClient.setQueryData(['watchlist'], (old: any = []) => {
    const exists = old.find(
      (x: any) => String(x.id) === String(item.movie_id) || String(x.movie_id) === String(item.movie_id)
    );
    // if the item already exists in the cache, return the old list without the item

    if (exists) return old;
    // otherwise add the new item to the list with a temporary id 
    return [
      {
        id: Date.now().toString(), // temp id
        movie_id: item.movie_id,
        original_title: item.original_title ?? '',
        poster_path: item.poster_path ?? '',
        release_date: item.release_date ?? '',
        vote_average: item.vote_average ?? 0,
      },
      ...old,
    ];
  });
}; 


// a function that uses id to check if item exist in our local cache and remove them if it does, then return a brand new list without the item
export const removeFromWatchlistCache = (queryClient: any, watchlistId: string) => {
  queryClient.setQueryData(['watchlist'], (old: any = []) => {
    return old?.filter((item: any) => String(item.id) !== String(watchlistId));
  });
};


// This is just a helper function to quickly check if a specific movie exists in your local cache.
export const isInWatchlist = (watchlist: any, movieId: string) => {
  return watchlist?.some(
    (item: any) => String(item.id) === String(movieId) || String(item.movie_id) === String(movieId)
  );
};



// Think of this file as your local "mini-database" manager. It directly edits the data currently sitting in your phone's memory without talking to the server.


// Yes, exactly! 

// The `old` parameter right there represents the **current state of the data** that React Query is holding in memory for the `['watchlist']` key *before* any changes are made.

// When you call `setQueryData`, React Query automatically passes whatever list of movies is currently sitting in the cache into that function as the first argument. We name it `old` (as in, the "old" data), and the ` = []` part just means "if the cache is completely empty right now, treat it as an empty array instead of crashing."

// So, you look at the `old` list, modify it (by adding or removing a movie), and whatever you `return` from that function becomes the **new** cached data!