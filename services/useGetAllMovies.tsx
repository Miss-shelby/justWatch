import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ApiFetcher from "@/services/ApiFetcher"

//old query wthout pagiantion, fetches first page only  by default
// export const useGetAllMovies= (page: string = "") => {
//     return useQuery<any>({
//         queryKey: ["all-movies", page],
//         queryFn: async () => {
//             const res = await ApiFetcher.get(`/p3/movie`);
//             // if (!res?.data) {
//             //     throw new Error("Movie in response");
//             // } 
//             return res;
           
            
//         },
//     });
// };

// The throw new Error("Movie in response")  is a different check — it throws when the request succeeds (200) but returns empty data, so i an as well skip it. Axios throw error automatically when the request is not sucessfull


interface MoviePage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // add other fields you use
}
//updated query to enable pagination, so data is fetched on reaching bottom of the page 
export const useGetAllMovies = () => {
  return useInfiniteQuery<MoviePage>({
    queryKey: ["all-movies"],
    queryFn: async ({ pageParam = 1 }): Promise<MoviePage>  => {
      const res = await ApiFetcher.get(`/p3/movie`, {
        params: { page: pageParam },
      });
    
      
      return res as unknown as MoviePage;
    },
    getNextPageParam: (lastPage:any) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};