import TopRatedCard from "@/components/cards/TopRatedCard";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { recommendedMovies } from "@/constants/data";
import { fetchUser } from "@/services/Api";
import {
  useGetMovieByGenre,
  useGetPopularMovie,
  useGetTopRatedMovie,
} from "@/services/useGetMovieByGenre";
import { useQuery } from "@tanstack/react-query";
import { styled } from "nativewind";
import {  Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { UserProfile } from "./profile";
import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";

const SafeAreaView = styled(RNSafeAreaView);
const MemoizedHeader = React.memo(HomeHeader);

export default function HomeScreen() {
  const { scrollHandler } = useAnimatedHeader();
  
  //we now use memoized header so that the components inside the header dosent rerender whn their parents rerender unlsess their props have changed 

  const { data: actionMovie } = useGetMovieByGenre(28);
  const { data: poplularMovies } = useGetPopularMovie();
  const { data: topRated } = useGetTopRatedMovie();

  const { data: user } = useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: fetchUser,
  });

  const imgBaseURL = "https://image.tmdb.org/t/p/w500/";
  const imgDropPathBaseURL = "https://image.tmdb.org/t/p/original/";
  // `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`

  return (
    <Animated.FlatList
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      className="bg-bg"
      contentContainerStyle={{
        paddingTop: 65,
        paddingBottom: 100,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<MemoizedHeader
      user={user}
      popularMovies={poplularMovies}
      actionMovie={actionMovie}
      imgBaseURL={imgBaseURL} 
      recommendedMovies ={recommendedMovies}
      />}
      data={topRated}
      renderItem={({ item }) => (
        <View className="mt-6" style={{ flex: 1 }}>
          <TopRatedCard
            tag={item.title}
            moviePoster={`${imgDropPathBaseURL}${item.backdrop_path}`}
          />
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
      keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
    />
  );
}
