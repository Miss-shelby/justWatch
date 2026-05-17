import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import image from "@/constants/image";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import TrendingNowCard from "@/components/cards/TrendingNowCard";
import TrendCard from "@/components/cards/TrendCard";
import { recommendedMovies, topRatedMovies, trendingMovies } from "@/constants/data";
import ListHeading from "@/components/ListHeading";
import RecommendedCard from "@/components/cards/RecommendedCard";
import TopRatedCard from "@/components/cards/TopRatedCard";
import { useGetAllMovies } from "@/services/useGetAllMovies";
import { useGetMovieByGenre, useGetPopularMovie, useGetTopRatedMovie } from "@/services/useGetMovieByGenre";
import { Link } from "expo-router";

export default function HomeScreen() {
 const { scrollHandler } = useAnimatedHeader();
 const SafeAreaView = styled(RNSafeAreaView)

 const {data,isLoading,error} = useGetAllMovies()
  const {data:actionMovie} = useGetMovieByGenre(28)
  const {data:poplularMovies } =  useGetPopularMovie()
   const {data:topRated } =  useGetTopRatedMovie()
   
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
          <Text className="text-gray text-lg font-body ">Good evening</Text>
          <Text className="text-light text-2xl font-heading">Ahmie</Text>
           <Link href="/(auth)/signIn">sign up here </Link>
          <TrendingNowCard/>
            <View className="mb-10">
            <ListHeading title ="Popular Movies" />
            <FlatList data={poplularMovies} renderItem={({item})=>(
              <TrendCard title={item.original_title} releaseDate={item.release_date} rating={item.vote_average} moviePoster=
              {`${imgBaseURL}${item.poster_path}`} />
            )} 
            horizontal
            ListEmptyComponent={
              <Text className="home-empty-state">
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
              <TrendCard title={item.original_title} releaseDate={item.release_date} rating={item.vote_average} moviePoster=
              {`${imgBaseURL}${item.poster_path}`} />
            )} 
            horizontal
            ListEmptyComponent={
              <Text className="home-empty-state">
                No Trending Movies.
              </Text>
            }
            keyExtractor={(item)=> item.title}
            showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className="mb-10">
            <ListHeading title ="Recommended for You" />
            <FlatList data={recommendedMovies} renderItem={({item})=>(
              <RecommendedCard {...item} />
            )} 
            horizontal
            ListEmptyComponent={
              <Text className="home-empty-state">
                No Trending Movies.
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
        <Text className="home-empty-state">
          No Top Rated Movies Yet..
        </Text>
      }
      keyExtractor={(item)=> item.id}
    />
  );
}
