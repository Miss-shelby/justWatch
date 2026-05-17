import { View, Text, Image, Pressable, ImageBackground } from 'react-native'
import React from 'react'

const TopRatedCard = ({tag,moviePoster}:TopRatedMovieProps) => {
  return (
    <Pressable className='rounded-xl'>
        <ImageBackground className='rounded-lg h-72 w-full bg-no-repeat justify-end overflow-hidden' resizeMode='cover' source={{uri:moviePoster}}>
       {
        tag && (
             <View className='p-4'>
             <Pressable className=' self-start w-fit px-2  rounded-lg'>
                    <Text numberOfLines={1} className=' text-sm text-white  font-serif uppercase'>{tag}</Text>
                </Pressable>
        </View>
        )
       }

        </ImageBackground>
    </Pressable>
  )
}

export default TopRatedCard