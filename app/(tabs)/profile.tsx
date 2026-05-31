import { favouriteGenres } from "@/constants/data";
import { fetchUser, useGetAiChatHistory } from "@/services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "@/utils/helpers";
import { useGetWatchlist } from "@/services/UseGetMovieFavourites";


const SafeAreaView = styled(RNSafeAreaView);
export interface UserProfile {
  status: string;
  result: {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    created_at: string;
    updated_at: string;
  };
}

export default function Profile() {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const { setIsSignedIn } = useAuth();
  const router = useRouter();
  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: fetchUser,
  });
  const { data: watchlist} = useGetWatchlist();
  const {data:chatHistory} = useGetAiChatHistory();
  const [watchedMovies, setWatchedMovies] = useState<number>(0);

  useEffect(() => {
    const loadWatchedMovies = async () => {
      const count = await AsyncStorage.getItem("watched_movie_count");
      setWatchedMovies(Number(count) || 0);
    };
    loadWatchedMovies();
  }, []);
 

 

  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    setIsSignedIn(false);
    router.replace("/(auth)/signIn");
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <Text className="text-white text-center">Something went wrong.</Text>
      </View>
    );
  }

  const firstInitials = data?.result.first_name.charAt(0);
  const secondInitials = data?.result.last_name.charAt(0);
  return (
    <SafeAreaView className="p-5 bg-bg  flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
      >
        <View className="flex flex-col items-center justify-center">
          <View className="bg-red h-15 w-15 flex justify-center items-center rounded-full">
            <Text className="text-white font-heading text-2xl">
              {firstInitials} {secondInitials}
            </Text>
          </View>
          <Text className="text-white pt-2 font-heading text-2xl">
            {data?.result.first_name ?? ""} {data?.result.last_name ?? ""}
          </Text>
          <Text className="text-[#666] pt-2">
            Member since {formatDate(data?.result.created_at ?? "")} · Cinema
            enthusiast
          </Text>
          <View className="bg-red/10 py-1 px-3.25 mt-2.5 rounded-2xl border border-red/30">
            <Text className="text-red  text-sm ">Premium Member</Text>
          </View>
          <View className="bg-[#2E2E2E]/15 flex flex-row justify-around w-full flex-1 py-3.5 px-2 mb-4 mt-8 rounded-md">
            <View>
              <Text className="text-red text-center font-bold text-lg">{watchedMovies}</Text>
              <Text className="text-[#666] text-center "> Watched</Text>
            </View>
            <View>
              <Text className="text-red text-center font-bold text-lg">{watchlist?.length ??0 }</Text>
              <Text className="text-[#666] text-center "> Watchlist</Text>
            </View>
            <View>
              <Text className="text-red text-center font-bold text-lg">{chatHistory?.result?.length ??0}</Text>
              <Text className="text-[#666] text-center "> AI Chat</Text>
            </View>
          </View>
          <View className="border-t border-card w-full">
            <Text className="text-[#555] font-semibold uppercase text-sm pt-3 ">
              Favourite Genres
            </Text>
            <View className="flex-row flex-wrap gap-x-5 gap-y-2.5 pt-5">
              {favouriteGenres.map((genre) => {
                const isSelected = selectedGenre.includes(genre.id);
                return (
                  <TouchableHighlight
                    onPress={() => {
                      setSelectedGenre((prev) =>
                        prev.includes(genre.id)
                          ? prev.filter((id) => id !== genre.id)
                          : [...prev, genre.id],
                      );
                    }}
                    key={genre.id}
                    className={`py-2 px-4 rounded-full border ${
                      isSelected
                        ? "bg-red/10 border-red/30"
                        : "bg-transparent border-[#333]"
                    }`}
                    underlayColor="transparent"
                  >
                    <Text
                      className={`text-xs ${isSelected ? "text-red" : "text-gray"}`}
                    >
                      {genre.title}
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          </View>
          <View className="border-t mt-5 border-card w-full">
            <Text className="text-[#555] font-semibold uppercase text-sm pt-3 ">
              Account
            </Text>
            <View className="flex-col gap-4  pt-5">
              <View className="flex-row gap-3 items-center">
                <View className="bg-[#2E2E2E]/20 rounded-xl h-8.5 w-8.5 "></View>
                <Text className="text-white ">Watch History</Text>
              </View>
              <View className="flex-row gap-3 items-center border-t pt-3 border-card ">
                <View className="bg-[#2E2E2E]/20 rounded-xl h-8.5 w-8.5 "></View>
                <Text className="text-white ">Notifications</Text>
              </View>
              <View className="flex-row gap-3 items-center border-t pt-3 border-card ">
                <View className="bg-[#2E2E2E]/20 rounded-xl h-8.5 w-8.5 "></View>
                <Text className="text-white ">Appearance</Text>
              </View>
              <Pressable
                onPress={handleLogout}
                className="flex-row gap-3 items-center border-t pt-3 pb-10 border-card "
              >
                <View className="bg-[rgba(247,67,75,0.12)] rounded-xl h-8.5 w-8.5 "></View>
                <Text className="text-[#F7434B] ">Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
