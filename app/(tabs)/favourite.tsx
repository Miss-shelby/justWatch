import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import  { FavouriteCard } from "@/components/cards/TrendCard";
import { FlatList } from "react-native";
import { fetchUser, UsegetFavourites } from "@/services/Api";
import { useGetWatchlist } from "@/services/UseGetMovieFavourites";
import ApiFetcher from "@/services/ApiFetcher"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "./profile";
import { useWatchlistActions } from "@/services/useWatchlistAction";
export default function Favourites() {
   const SafeAreaView = styled(RNSafeAreaView)
    const { data: watchlist, isLoading, refetch } = useGetWatchlist();
    console.log(watchlist,'favourite watchlist');

    const queryClient = useQueryClient();
    const { data:user } = useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: fetchUser,
  });
  const imgBaseURL ="https://image.tmdb.org/t/p/w500/"
  const { remove } = useWatchlistActions(user?.result.email);

// const handleDelete = async (watchlistId: string) => {
//   try {
//     const res = await ApiFetcher.delete(`/p3/watch-list/${watchlistId}?email=${user?.result.email}`);
//     console.log(res, 'delete res');
//     if(res ){
//       Alert.alert('Success', 'Movie removed from watchlist');
//       refetch();
//     }
//   } catch (error) {
//     console.log(error, 'delete error');
//     Alert.alert('Error', 'Failed to delete from watchlist');
//   }
// };

const deleteMutation = useMutation({
  mutationFn: async (watchlistId: string) => {
    return await ApiFetcher.delete(`/p3/watch-list/${watchlistId}?email=${user?.result.email}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['watchlist'] });
     Alert.alert('Success', 'Movie removed from watchlist');
  },
  onError: (error) => {
    console.log(error, 'delete error');
    Alert.alert('Error', 'Failed to delete from watchlist');
  }
});

const handleDelete = (watchlistId: string) => {
  remove.mutate(watchlistId);
};

      
if (isLoading) {
  return (
    <View className="flex-1 items-center justify-center bg-[#0e0e0e]">
      <ActivityIndicator color="#fff" />
    </View>
  );
}
  return (
     <SafeAreaView className="flex-1 w-full bg-[#0e0e0e] p-5">
         <FlatList data={watchlist} renderItem={({item})=>(

              <FavouriteCard title={item.original_title} id={item.movie_id}releaseDate={item.release_date} rating={item.vote_average} moviePoster=
              {`${imgBaseURL}${item.poster_path}`} handleDelete={()=>handleDelete(item.id)} />
              )} 
              ListHeaderComponent={ () => (
                 <View>
                  <Text className="text-white font-body text-2xl">My Favourites</Text>
                  <Text className="text-gray pt-1 text-lg">{watchlist?.length ??'-' } Movies saved </Text>
                </View>
              )
              }
              ListEmptyComponent={
                <Text className="home-empty-state text-white pt-10">
                  No  Movies saved yet.
                </Text>
              }
             keyExtractor={(item) => item.id?.toString()}
               showsVerticalScrollIndicator={false}
               numColumns={2}
               columnWrapperStyle={{ gap: 16 }}
              />
      </SafeAreaView>
          
      
  );
}
