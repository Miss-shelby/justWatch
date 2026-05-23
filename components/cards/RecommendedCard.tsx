import { View, Text, Image, Pressable, ImageBackground } from 'react-native'
import React from 'react'


const RecommendedCard = ({title,subtitle,tag,moviePoster}:RecommendedMovieProps) => {
  
    
  return (
    <Pressable className=' mt-4 w-80 rounded-xl mr-4 '>
        <ImageBackground className='rounded-xl h-60  w-full bg-no-repeat justify-center  overflow-hidden' resizeMode='cover' source={moviePoster}>
        <View className='p-4 flex-1 justify-end '> 
             <Pressable className='bg-red self-start mb-1 w-fit px-2 py-1 rounded-lg'>
                    <Text className='text-white font-bold uppercase'>{tag}</Text>
                </Pressable>
            <Text numberOfLines={1}  className='text-white text-2xl self-start font-heading text-center font-black mb-1'>{title}</Text>
            {/* <View className='flex-row justify-between items-center'>
                <Text numberOfLines={1} className='text-gray text-xl text-center '>
                {subtitle}
                </Text>
                
            </View> */}
        </View>

        </ImageBackground>
    </Pressable>
  )
}

export default RecommendedCard