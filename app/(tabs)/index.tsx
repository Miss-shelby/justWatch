import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import image from "@/constants/image";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import TrendingNowCard from "@/components/cards/TrendingNowCard";
import TrendCard from "@/components/cards/TrendCard";
import { recommendedMovies, trendingMovies } from "@/constants/data";
import ListHeading from "@/components/ListHeading";
import RecommendedCard from "@/components/cards/RecommendedCard";

export default function HomeScreen() {
 const { scrollHandler } = useAnimatedHeader();
 const SafeAreaView = styled(RNSafeAreaView)

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      className='bg-bg'
      contentContainerStyle={{
        paddingTop: 65,
        paddingBottom: 100,
        paddingHorizontal: 20
      }}
       showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
      <Text className="text-gray text-lg font-body ">Good evening</Text>
      <Text className="text-light text-2xl font-heading">Ahmie</Text>
      <TrendingNowCard/>
      <View className="mb-10">
          <ListHeading title ="Trending Now" />
          <FlatList data={trendingMovies} renderItem={({item})=>(
            <TrendCard {...item} />
          )} 
          horizontal
          ListEmptyComponent={
              <Text className="home-empty-state">
                No Trending Movies.
              </Text>
                    }
          keyExtractor={(item)=> item.title}
          showsHorizontalScrollIndicator = {false}
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
          showsHorizontalScrollIndicator = {false}
          />
      </View>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}