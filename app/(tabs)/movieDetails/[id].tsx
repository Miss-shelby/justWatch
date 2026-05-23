import { Alert, Animated, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableHighlight, View, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { Ionicons } from '@expo/vector-icons';
import image from '@/constants/image';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ListHeading from '@/components/ListHeading';
import TrendCard from '@/components/cards/TrendCard';
import { useGetMovieByGenre, useGetMovieById, useGetSimilarMovie } from '@/services/useGetMovieByGenre';
import { ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av'
import MoviePlayer from '@/components/MoviePlayer';

const MovieDetails = () => {
    const SafeAreaView = styled(RNSafeAreaView)
    const { id } = useLocalSearchParams<{id:string}>();
    const {data:actionMovie} = useGetSimilarMovie(id)
    const { data: movie, isLoading, error, refetch } = useGetMovieById(id);
    const [isFavourited, setIsFavourited] = useState(false)
    const [showPlayer, setShowPlayer] = useState(false) // MODAL STATE
    
    const router = useRouter()
    const scaleAnim = useRef(new Animated.Value(1)).current
    const navigation = useNavigation()
    
    const handleBack = () => {
        if (navigation.canGoBack()) {
            router.back()
        } else {
            router.push('/(tabs)')
        }
    }
    
    const imgBaseURL = "https://image.tmdb.org/t/p/w500/"
    const moviePoster = movie ? `${imgBaseURL}${movie.poster_path}` : image.moviePoster
    
    useEffect(() => {
        setIsFavourited(false)
    }, [id])

    const playLikeSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('@/assets/sounds/like.mp3.wav')
        )
        await sound.playAsync()
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
                sound.unloadAsync()
            }
        })
    }
    
    const handleAddToFav = async () => {
        setIsFavourited(prev => !prev)
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start()
        await playLikeSound()
        Alert.alert("Added to favourites!")
    }

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
                <Text className="text-gray text-sm mt-2" onPress={() => refetch()}>Tap to retry</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className='flex-1 w-full bg-[#0e0e0e]'>
            <ScrollView 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false} 
                className='flex-1'
            >
                {/* HEADER - Back & Favorite */}
                <View className='flex-row items-center justify-between px-5 pt-5 pb-0'>
                    <Pressable onPress={handleBack}>
                        <Ionicons color='white' size={24} name='arrow-back'/>
                    </Pressable>
                    <TouchableHighlight onPress={handleAddToFav}>
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Ionicons
                                color={isFavourited ? '#F7434B' : 'white'}
                                size={24}
                                name={isFavourited ? 'heart' : 'heart-outline'}
                            />
                        </Animated.View>
                    </TouchableHighlight>
                </View>

                {/* HERO POSTER - No player here */}
                <View className='mt-5 px-5'>
                    <ImageBackground 
                        className='w-full h-96 rounded-2xl overflow-hidden'
                        resizeMode='cover' 
                        source={{uri: moviePoster}}
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(14,14,14,0.85)', '#0e0e0e']}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 250,
                            }}
                        />
                        
                        {/* TITLE & INFO on poster */}
                        <View className='absolute bottom-0 left-0 right-0 px-4 pb-4'>
                            <Text className='text-white text-2xl font-heading mb-2'>
                                {movie?.original_title}
                            </Text>
                            
                            <View className='flex-row items-center gap-2 flex-wrap'>
                                <View className='flex-row items-center bg-card rounded-full px-2 py-1 gap-1'>
                                    <Text className='text-yellow-400 text-xs'>★</Text>
                                    <Text className='text-white text-xs font-body'>{movie?.vote_average.toFixed(1)}</Text>
                                </View>
                                <View className='border border-light rounded px-1'>
                                    <Text className='text-light text-xs'>R</Text>
                                </View>
                                <Text className='text-light text-xs'>{movie?.release_date?.split('-')[0]}</Text>
                                {movie?.genres.slice(0, 2).map((genre: any) => (
                                    <Text className='text-light text-xs' key={genre.id}>{genre.name}</Text>
                                ))}
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* WATCH BUTTON - Opens modal */}
                <Pressable 
                    onPress={() => setShowPlayer(true)}
                    className='bg-red rounded-full mx-5 mt-6 py-4 flex-row items-center justify-center gap-2'
                >
                    <Ionicons name='play' color='white' size={24}/>
                    <Text className='text-white font-bold text-lg'>Watch Now</Text>
                </Pressable>
                
                {/* SYNOPSIS */}
                <View className='px-5 mt-6'>
                    <Text className='text-white text-xl font-bold mb-2'>Synopsis</Text>
                    <Text className='text-gray leading-6'>{movie?.overview}</Text>
                </View>

                {/* DETAILS CARD */}
                <BlurView intensity={10} tint="light" className='mx-5 p-4 mt-6 rounded-lg'>
                    <View>
                        <Text className='text-white font-bold mb-4'>Details</Text>
                        
                        <View className='flex-row justify-between mb-3'>
                            <Text className='text-gray'>Tagline</Text>
                            <Text className='text-white text-sm flex-1 ml-2'>{movie?.tagline || 'N/A'}</Text>
                        </View>
                        
                        <View className='flex-row justify-between mb-3'>
                            <Text className='text-gray'>Country</Text>
                            <Text className='text-white text-sm'>
                                {movie?.production_countries?.map((c: any) => c.name).join(', ') || 'N/A'}
                            </Text>
                        </View>
                        
                        <View>
                            <Text className='text-gray mb-2'>Studios</Text>
                            {movie?.production_companies?.map((company: any) => (
                                <View className='flex-row items-center gap-2 mb-1' key={company.name}>
                                    <View className='w-1 h-1 bg-red rounded-full'/>
                                    <Text className='text-white text-sm'>{company.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </BlurView>

                {/* SIMILAR MOVIES */}
                <View className='mt-8 px-5 pb-10'>
                    <ListHeading title="Similar Movies" />
                    <FlatList 
                        data={actionMovie} 
                        renderItem={({item}) => (
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
                        scrollEnabled={false}
                        ListEmptyComponent={
                            <Text className="text-gray text-center">No Similar Movies</Text>
                        }
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>

            {/* PLAYER MODAL */}
            <Modal 
                visible={showPlayer} 
                animationType="slide"
                onRequestClose={() => setShowPlayer(false)}
            >
                <View className='flex-1 bg-black'>
                    <View className='flex-row items-center justify-between px-5 py-4 pt-20'>
                        <Text className='text-white text-lg font-bold'>{movie?.original_title}</Text>
                        <Pressable onPress={() => setShowPlayer(false)}>
                            <Ionicons name='close' size={24} color='white'/>
                        </Pressable>
                    </View>
                    
                    <View className='flex-1'>
                        <MoviePlayer movieId={id} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default MovieDetails