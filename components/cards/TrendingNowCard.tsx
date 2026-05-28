import { View, Text, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import image from '@/constants/image'
import { Ionicons } from '@expo/vector-icons'
import { useGetTopRatedMovie } from '@/services/useGetMovieByGenre'
import { GENRES } from '@/constants/genre'
import { Link } from 'expo-router'

const TrendingNowCard = () => {
    const {data:topRated } =  useGetTopRatedMovie()
   const imgBaseURL ="https://image.tmdb.org/t/p/w500/" 
   // ADD THIS - wait for data before rendering
  if (!topRated || topRated.length === 0) return null;
    const moviePoster = topRated ? `${imgBaseURL}${topRated[0].poster_path}` : image.moviePoster
    const genreIds = topRated[0]?.genre_ids ?? []
   const filteredGenre = genreIds?.map((id: number) => GENRES[id]).filter(Boolean)
  return (
    <Pressable className='mt-4'> 
        <ImageBackground className='bg-no-repeat flex-1 justify-center h-[60vh] w-full rounded-2xl overflow-hidden' resizeMode='cover' source={{uri:moviePoster}}>
         {/* Gradient fade over the bottom of the image */}
        <LinearGradient
          colors={['transparent','rgba(14,14,14,0.85)', '#1E1E1E']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 300,
          }}/>
           <Pressable className='bg-red rounded-xl flex-row items-center gap-2  py- px-2 self-center absolute right-1 top-1 '>
                    <Text className='text-white font-body text-xs'>TopRated</Text>
            </Pressable>
           {/* Movie info sitting on top of the gradient */}
        <View className='absolute bottom-0 left-0 right-0 px-4 pb-4'>
          {/* Title */}
          {/* <Text className='text-white text-2xl font-heading text-center mb-1'>
            Blade Runner 2049
          </Text> */}

          {/* Cast */}
          {/* <Text className='text-light text-xs text-center mb-3 tracking-widest'>
            RYAN GOSLING · HARRISON FORD
          </Text> */}
          {/* Tags row */}
            <View className='flex-row flex-wrap items-center justify-center gap-2 mb-4 px-4'>
                    <View className='flex-row items-center bg-card rounded-full px-2 py-1 gap-1'>
                        <Text className='text-yellow-400 text-xs'>★</Text>
                        <Text className='text-white text-xs font-body'>{Math.round(Number(topRated[0].vote_average))}</Text>
                    </View>
                    <View className='border border-light rounded px-1'>
                        <Text className='text-light text-xs'>R</Text>
                    </View>
                    <Text className='text-light text-xs'>{topRated[0]?.release_date}</Text>
                    {filteredGenre?.map((genre: string) => ( 
                      <Text className='text-light text-xs' key={genre}>{genre}</Text>
                    ))}
            </View>
             {/* Watch Now button */}
             <Link
             href={{
              pathname:"/movieDetails/[id]",
              params: { id: topRated[0].id }
             }}
             asChild
             > 
                <Pressable className='bg-red rounded-2xl flex-row items-center gap-2  py-3 px-10 self-center mb-4'>
                    <Ionicons name='play' color='white' size={20}/>
                    <Text className='text-white font-body text-base'>Play Now</Text>
                </Pressable>
             </Link>

          </View>
        </ImageBackground>
    </Pressable>
  )
}

export default TrendingNowCard