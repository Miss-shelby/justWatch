import { Text, View, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import TrendingNowCard from "@/components/cards/TrendingNowCard";
import TrendCard from "@/components/cards/TrendCard";
import { recommendedMovies } from "@/constants/data";
import ListHeading from "@/components/ListHeading";
import RecommendedCard from "@/components/cards/RecommendedCard";
import TopRatedCard from "@/components/cards/TopRatedCard";
import { useGetMovieByGenre, useGetPopularMovie, useGetTopRatedMovie } from "@/services/useGetMovieByGenre";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/services/Api";
import { UserProfile } from "./profile";
import { getGreeting } from "@/utils/helpers";

export default function HomeScreen() {
 const { scrollHandler } = useAnimatedHeader();
 const SafeAreaView = styled(RNSafeAreaView)
 
  const {data:actionMovie} = useGetMovieByGenre(28)
  const {data:poplularMovies } =  useGetPopularMovie()
  const {data:topRated } =  useGetTopRatedMovie()

const {data:user} = useQuery<UserProfile>({
  queryKey:['user-profile'],
  queryFn:fetchUser
 })
   
 const imgBaseURL ="https://image.tmdb.org/t/p/w500/"
  const imgDropPathBaseURL = "https://image.tmdb.org/t/p/original/"
  // `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`



  return (
    <Animated.FlatList
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      className='bg-bg'
      contentContainerStyle={{
        paddingTop: 65,
        paddingBottom: 100,
        paddingHorizontal: 20
      }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <SafeAreaView>
          <Text className="text-gray text-lg font-body ">{getGreeting()}</Text>
          <Text className="text-light text-2xl font-heading">{user?.result.username}</Text>
          <TrendingNowCard/>
            <View className="mb-10">
            <ListHeading title ="Popular Movies" />
            <FlatList data={poplularMovies} renderItem={({item})=>(
              <View className="w-44 mr-4">
                <TrendCard title={item.original_title} releaseDate={item.release_date} rating={item.vote_average} moviePoster=
                {`${imgBaseURL}${item.poster_path}`} />
              </View>
            )} 
            horizontal
            ListEmptyComponent={
              <Text className="home-empty-state text-white">
                No Trending Movies.
              </Text>
            }
            keyExtractor={(item)=> item.title}
            showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className="mb-10">
            <ListHeading title ="Action Movies" />
            <FlatList data={actionMovie} renderItem={({item})=>(
              <View className="mr-4 w-44">
                <TrendCard title={item.original_title} releaseDate={item.release_date} rating={item.vote_average} moviePoster=
                {`${imgBaseURL}${item.poster_path}`} />

              </View>
            )} 
            horizontal
            ListEmptyComponent={
              <Text className="home-empty-state text-white">
                No Trending Movies.
              </Text>
            }
            keyExtractor={(item)=> item.title}
            showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className="mb-10">
            <ListHeading title ="Recommended for You" />
            <FlatList data={recommendedMovies}
             renderItem={({item})=>(
              <RecommendedCard {...item} />
            )} 
            horizontal
            ListEmptyComponent={
              <Text className="home-empty-state text-white">
                No  Movies Found.
              </Text>
            }
            keyExtractor={(item)=> item.title}
            showsHorizontalScrollIndicator={false}
            />
          </View>
          <ListHeading title ="Top Rated Movies " />
        </SafeAreaView>
      )}
      data={topRated}
      renderItem={({item})=>(
        <View style={{ flex: 1 }}>
          <TopRatedCard tag={item.title}
          moviePoster={`${imgDropPathBaseURL}${item.backdrop_path}`} />
        </View>
      )} 
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      ItemSeparatorComponent={() => <View className="h-4"></View>}
      ListEmptyComponent={
        <Text className="home-empty-state text-white">
          No Top Rated Movies Yet..
        </Text>
      }
      keyExtractor={(item)=> item.id}
    />
  );
}
