export const addToWatchlistCache = (queryClient: any, item: any) => {
  queryClient.setQueryData(['watchlist'], (old: any = []) => {
    const exists = old.find(
      (x: any) => String(x.movie_id) === String(item.movie_id)
    );

    if (exists) return old;

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

export const removeFromWatchlistCache = (queryClient: any, watchlistId: string) => {
  queryClient.setQueryData(['watchlist'], (old: any = []) => {
    return old?.filter((item: any) => String(item.id) !== String(watchlistId));
  });
};

export const isInWatchlist = (watchlist: any, movieId: string) => {
  return watchlist?.some(
    (item: any) => String(item.movie_id) === String(movieId)
  );
};