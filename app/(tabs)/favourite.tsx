import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useGetMovieByGenre } from "@/services/useGetMovieByGenre";
import ListHeading from "@/components/ListHeading";
import  { FavouriteCard } from "@/components/cards/TrendCard";
import { FlatList } from "react-native";
import { Link } from "expo-router";


;
export default function Favourites() {
   const SafeAreaView = styled(RNSafeAreaView)
     const {data:actionMovie} = useGetMovieByGenre(35)
      const imgBaseURL ="https://image.tmdb.org/t/p/w500/"

  return (
     <SafeAreaView className="flex-1 w-full bg-[#0e0e0e] p-5">
         <FlatList data={actionMovie} renderItem={({item})=>(
              <FavouriteCard title={item.original_title} id={item.id}releaseDate={item.release_date} rating={item.vote_average} moviePoster=
              {`${imgBaseURL}${item.poster_path}`} />
              )} 
              ListHeaderComponent={ () => (
                 <View>
                  <Text className="text-white font-body text-2xl">My Favourites</Text>
                  <Text className="text-gray pt-1 text-lg">12 Movies saved </Text>
                </View>
              )

              }
              ListEmptyComponent={
                <Text className="home-empty-state text-white">
                  No Trending Movies.
                </Text>
              }
              keyExtractor={(item)=> item.title}
               showsVerticalScrollIndicator={false}
               numColumns={2}
               columnWrapperStyle={{ gap: 16 }}
              />
      </SafeAreaView>
          
      
  );
}
