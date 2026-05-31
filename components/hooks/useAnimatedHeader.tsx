import { AnimatedHeader } from "@/components/headers/AnimatedHeader";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

export function useAnimatedHeader() {
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => <AnimatedHeader scrollY={scrollY} />,
    });
  }, [navigation, scrollY]);

  return { scrollHandler, scrollY };
}