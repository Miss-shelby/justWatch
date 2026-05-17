import { useQuery } from "@tanstack/react-query";
import ApiFetcher from "@/services/ApiFetcher"
export const useGetAllMovies= (page: string = "") => {
    return useQuery<any>({
        queryKey: ["all-movies", page],
        queryFn: async () => {
            const res = await ApiFetcher.get(`/p3/movie`);
            // if (!res?.data) {
            //     throw new Error("Movie in response");
            // } 
            return res;
           
            
        },
    });
};

// The throw new Error("Movie in response")  is a different check — it throws when the request succeeds (200) but returns empty data, so i an as well skip it. Axios throw error automatically when the request is not sucessfull