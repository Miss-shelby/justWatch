import Toast from "react-native-toast-message";
import ApiFetcher from "@/services/ApiFetcher"
import { useQuery } from "@tanstack/react-query";
export const login:any = async (formData:any) => {
    const response = await ApiFetcher.post("/auth/login/", formData);
    return response;

    //     If you only return error, React Query will never treat it as an error.
    // If you throw error, it behaves exactly like you expect:
    // ✅ onError runs
    // ✅ isError becomes true
    // ✅ API response details are still available in that case use   throw error; // or throw new Error(error?.response?.data?.message);
    //if you dont throw error, you will never get to see  the error where youre calling the function
};

export const register:any = async (formData:any) => {
  try {
    const response = await ApiFetcher.post("/auth/register/", formData);
    
    return response;
  } catch (error: any) {
   Toast.show({
      type: "error",
      text1: error?.response?.data?.message || "User not verified",
      position: "top",
    });

    throw error;
    }
};

// Simple rule:

// If you use a try/catch yourself → you must throw to pass the error up
// If you let React Query's queryFn/mutationFn handle it → it catches automatically e.g const { mutate } = useMutation({
  // mutationFn: (formData) => ApiFetcher.post("/auth/register/", formData)
  // no try/catch needed — react query handles it
// })

// ✅ Best way:For useMutation, don't use try/catch inside the function — let React Query handle it:
// const { mutate, isError, error } = useMutation({
//   mutationFn: (formData) => ApiFetcher.post("/auth/register/", formData),
//   onError: (error) => {
//     Toast.show({
//       type: "error",
//       text1: error?.response?.data?.message || "Something went wrong",
//       position: "top",
//     });
//   },
//   onSuccess: (data) => {
//     // handle success
//   }
// })


export const fetchUser:any = async () => {
    const response = await ApiFetcher.get("/auth/user-me/");
    return response;
};

export const UsegetFavourites:any =  () => {
  return useQuery({
    queryKey: ["favourites"],
    queryFn: async () => {
      const response = await ApiFetcher.get("/p3/watch-list/");
      return response
    }

  })    
};


export const useGetAiChatHistory:any =  () => {
  return useQuery({
    queryKey: ["ai-chat"], 
    queryFn: async () => {
      const response = await ApiFetcher.get("/ai/chats/");
      console.log(response,'fetch api response');
       
      return response 
    }
 
  })    
};
export const postAiChat:any = async (userMsg:any) => {
    const response = await ApiFetcher.post("/ai/chats/", {message:userMsg});
    return response
};