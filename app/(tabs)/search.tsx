import { Text, View, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import image from "@/constants/image";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import TrendCard from "@/components/cards/TrendCard";
import { useGetAllMovies } from "@/services/useGetAllMovies";
import { useMemo, useState } from "react";
import { useSearchMovies } from "@/services/useSearchMovies";
import { Platform } from "react-native";

export default function SearchScreen() {
 const { scrollHandler } = useAnimatedHeader();
 const SafeAreaView = styled(RNSafeAreaView)
 const [query, setQuery] = useState('')

 // always fetches on page load
const {data:popularMovies,isLoading,error,refetch,isRefetching} = useGetAllMovies()

// only fetches when user types
const { data: searchResults, fetchNextPage, hasNextPage,isFetchingNextPage } = useSearchMovies(query)

// show search results when typing, popular movies when not
const movies = query 
  ? searchResults?.pages.flatMap(page => page.results) ?? []
  : popularMovies?.results ?? []

const imgBaseURL ="https://image.tmdb.org/t/p/w500/"

 const header = useMemo(
    () => (
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <TextInput
            className="bg-[#141414] w-full rounded-2xl border-none px-4 py-4 text-lg font-sans-medium text-white placeholder:text-gray"
            value={query}
            onChangeText={setQuery}
            placeholder="Search movies..."
            placeholderTextColor="#888"
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    ),
    [query]
  );

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
      ListHeaderComponent={header}
      data={movies}
       refreshing={isRefetching}
       onRefresh={refetch}
      renderItem={({item})=>(
              <TrendCard title={item.original_title} releaseDate={item.release_date} rating={item.vote_average} moviePoster=
              {`${imgBaseURL}${item.poster_path}`} />
            )}  
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      ItemSeparatorComponent={() => <View className="h-4"></View>}
      ListEmptyComponent={
        <Text className="home-empty-state text-white">
          No  Movies Yet..
        </Text>
      }
      onEndReachedThreshold={0.5} // loads next page when 50% from bottom
       ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      keyExtractor={(item)=> item.id}
      onEndReached={() => {
     if (query && hasNextPage) fetchNextPage()
     }}
    keyboardShouldPersistTaps="handled"
    />
  );
}

//keyboard dissapears earlier on each keystroke because i was passing the text input directly to the list component:() => <TextInput and this causes the textinput to be recreated on each render and the key stroke causes rerender 
//   because when state changes the whole component rerender, in tis case textinput because its called directly but when i pass the header refrence, its created once when the component mounts because its now a function refrence so that way even if the query causees the page to rerender multiple times, searchinput isnt affected.