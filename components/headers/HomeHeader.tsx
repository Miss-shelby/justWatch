import { FlatList, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrendingNowCard from "../cards/TrendingNowCard";
import { View } from "react-native";
import ListHeading from "./ListHeading";
import TrendCard from "../cards/TrendCard";
import RecommendedCard from "../cards/RecommendedCard";
import { getGreeting } from "@/utils/helpers";

function HomeHeader({
  user,
  popularMovies,
  actionMovie,
  imgBaseURL,
  recommendedMovies
}: any) {
// keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}

  const insets = useSafeAreaInsets();
  return (
     <View style={{ paddingTop: insets.top }}>
          <Text className="text-gray text-lg font-body ">{getGreeting()} </Text>
          <Text className="text-light text-2xl font-heading">
            {user?.result.username}
          </Text>
          <TrendingNowCard />
          <View className="my-10">
            <ListHeading title="Popular Movies" />
            <FlatList
              data={popularMovies}
              renderItem={({ item }) => (
                <View className="w-44 mr-4">
                  <TrendCard
                    title={item.original_title}
                    releaseDate={item.release_date}
                    rating={item.vote_average}
                    moviePoster={`${imgBaseURL}${item.poster_path}`}
                  />
                </View>
              )}
              horizontal
              ListEmptyComponent={
                <Text className="home-empty-state text-white">
                  No Trending Movies.
                </Text>
              }
              keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className="mb-10">
            <ListHeading title="Action Movies" />
            <FlatList
              data={actionMovie}
              renderItem={({ item }) => (
                <View className="mr-4 w-44">
                  <TrendCard
                    title={item.original_title}
                    releaseDate={item.release_date}
                    rating={item.vote_average}
                    moviePoster={`${imgBaseURL}${item.poster_path}`}
                  />
                </View>
              )}
              horizontal
              ListEmptyComponent={
                <Text className="home-empty-state text-white">
                  No Trending Movies.
                </Text>
              }
              keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {/* <View className="mb-10">
            <ListHeading title="Recommended for You" />
            <FlatList
              data={recommendedMovies}
              renderItem={({ item }) => <RecommendedCard {...item} />}
              horizontal
              ListEmptyComponent={
                <Text className="home-empty-state text-white">
                  No Movies Found.
                </Text>
              }
              keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
          <ListHeading title="Top Rated Movies " />
        </View>
  );
}

export default HomeHeader













//renderItem={({item}) =>: This recreates functions every render and forces rerenders of ALL items,Use useCallback.



// we created thi file to avoid unnecessary renrenders, the home page ui is always flickering and its caused by unnecessary rerender, the main flatlist that has all those component inside the listHeader causes all the components to renrender whenever there is an update, Every render creates a brand new header component.

// That means:

// all 3 horizontal FlatLists remount
// images reload
// layout recalculates
// animations restart