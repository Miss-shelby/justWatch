import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import image from '@/constants/image'

const TrendCard = ({title,releaseDate,rating,moviePoster}:TrendingMovieProps) => {
  
  return (
    <View className='bg-transparent mt-4 w-44 rounded-xl mr-4'>
        <Image className='rounded-xl h-72 w-full' source={{uri:moviePoster}}/>
      <View>
        <Text numberOfLines={1}  className='text-white text-lg self-start font-heading text-center mb-1'>{title}</Text>
        <View className='flex-row justify-between items-center'>
            <Text className='text-light text-base text-center '>
                        {releaseDate}
             </Text>
             <View className='flex-row items-center gap-2'>
                <Ionicons name='star-outline' color='#F7434B'/>
                 <Text className='text-red font-medium'>{rating}</Text>
             </View>
        </View>
      </View>
    </View>
  )
}

export default TrendCard