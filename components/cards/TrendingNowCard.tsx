import { View, Text, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import image from '@/constants/image'
import { Ionicons } from '@expo/vector-icons'

const TrendingNowCard = () => {
  return (
    <Pressable className='mt-4'>
        <ImageBackground className='bg-no-repeat flex-1 justify-center h-[60vh] w-full rounded-2xl overflow-hidden' resizeMode='cover' source={image.moviePoster}>
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
           <Pressable className='bg-red rounded-xl flex-row items-center gap-2  py- px-2.5 self-center absolute right-1 top-1 '>
                    <Text className='text-white font-body text-xs'>Trending#1</Text>
            </Pressable>
           {/* Movie info sitting on top of the gradient */}
        <View className='absolute bottom-0 left-0 right-0 px-4 pb-4'>
          {/* Title */}
          <Text className='text-white text-2xl font-heading text-center mb-1'>
            Blade Runner 2049
          </Text>

          {/* Cast */}
          <Text className='text-light text-xs text-center mb-3 tracking-widest'>
            RYAN GOSLING · HARRISON FORD
          </Text>
          {/* Tags row */}
            <View className='flex-row items-center justify-center gap-2 mb-4'>
                    <View className='flex-row items-center bg-card rounded-full px-2 py-1 gap-1'>
                        <Text className='text-yellow-400 text-xs'>★</Text>
                        <Text className='text-white text-xs font-body'>4.8</Text>
                    </View>
                    <View className='border border-light rounded px-1'>
                        <Text className='text-light text-xs'>R</Text>
                    </View>
                    <Text className='text-light text-xs'>2017</Text>
                    <Text className='text-light text-xs'>164m</Text>
                    <Text className='text-light text-xs'>Sci-fi</Text>
                    <Text className='text-light text-xs'>Action</Text>
            </View>
             {/* Watch Now button */}
                <Pressable className='bg-red rounded-2xl flex-row items-center gap-2  py-3 px-10 self-center mb-4'>
                    <Ionicons name='play' color='white' size={20}/>
                    <Text className='text-white font-body text-base'>Play Now</Text>
                </Pressable>
                {/* Pagination dots */}
                {/* <View className='flex-row justify-center gap-2'>
                    <View className='w-5 h-1 bg-red rounded-full'/>
                    <View className='w-5 h-1 bg-light rounded-full'/>
                    <View className='w-5 h-1 bg-light rounded-full'/>
                    <View className='w-5 h-1 bg-light rounded-full'/>
                </View> */}

          </View>
        </ImageBackground>
    </Pressable>
  )
}

export default TrendingNowCard