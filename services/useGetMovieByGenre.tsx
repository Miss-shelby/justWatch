import { useQuery } from "@tanstack/react-query";
import ApiFetcher from "@/services/ApiFetcher"
import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export const useGetMovieByGenre = (genreId: number) => {
  return useQuery({
    queryKey: ["movies-by-genre", genreId],
    queryFn: async () => {
      const res = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          with_genres: genreId,
          sort_by: "popularity.desc",
        }
      });
      
      return res.data.results;
    },
  });
};

export const useGetPopularMovie = () => {
  return useQuery({
    queryKey: ["popular-movies"],
    queryFn: async () => {
      const res = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
        params: {
          api_key: TMDB_API_KEY,
          sort_by: "popularity.desc",
        }
      });
      
      return res.data.results;
    },
  });
};

export const useGetTopRatedMovie = () => {
  return useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: async () => {
      const res = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
        params: {
          api_key: TMDB_API_KEY,
          sort_by: "popularity.desc",
        }
      });
      
      return res.data.results;
    },
  });
};
export const useGetSimilarMovie = (movie_id:string) => {
  return useQuery({
    queryKey: ["similar-movies"],
    queryFn: async () => {
      const res = await axios.get(`${TMDB_BASE_URL}/movie/${movie_id}/similar`, {
        params: {
          api_key: TMDB_API_KEY,
          sort_by: "popularity.desc",
        }
      });   
      return res.data.results;
    },
    enabled:!!movie_id
  });
};


export const useGetMovieById = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
        params: {
          api_key: TMDB_API_KEY,
        }
      });
      return res.data;
    },
    enabled: !!id,
  });
};

