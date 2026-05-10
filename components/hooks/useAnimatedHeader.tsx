import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export function useAnimatedHeader() {
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => <AnimatedHeader scrollY={scrollY} />,
    });
  }, []);

  return { scrollHandler, scrollY };
}