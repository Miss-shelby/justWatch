import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Image } from "expo-image";

export const TrendCard = ({title,releaseDate,rating,moviePoster}:TrendingMovieProps) => {
  // removed mr-4 
  return (
    <View className='bg-transparent mt-4   rounded-xl '>
       <Image
        source={{ uri: moviePoster }}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={300}
        style={{
          width: "100%",
          height: 288,
          borderRadius: 12,
        }}
      />
      <View>
        <Text numberOfLines={1}  className='text-white text-lg self-start font-heading text-center mb-1'>{title}</Text>
        <View className='flex-row justify-between items-center'>
            <Text className='text-light text-base text-center '>
                        {releaseDate}
             </Text>
             <View className='flex-row items-center gap-2'>
                <Ionicons name='star-outline' color='#F7434B'/>
                 <Text className='text-red font-medium'>{Math.round(Number(rating))}</Text>
             </View>
        </View>
      </View>
    </View>
  )
}



export const FavouriteCard = ({title,releaseDate,rating,moviePoster,id,handleDelete}:FavouriteMovieProps) => {
    
  return (

    <View className='bg-transparent mt-4 w-full flex-1 rounded-xl '>
        <Link className="" href={{
                pathname: "/movieDetails/[id]",
                params: { id: id }
            }} asChild >
            <TouchableOpacity className="">
              <Image transition={30} cachePolicy='memory-disk' contentFit='cover'
               className='rounded-xl  w-full' source={{uri:moviePoster}}
               style={{
              width: "100%",
              height: 240,
              borderRadius: 12,
            }}
               />
            </TouchableOpacity>
        </Link>
      <View>
        <Text numberOfLines={1}  className='text-white text-lg self-start font-heading text-center mb-1'>{title}</Text>
        <View className='flex-row justify-between items-center'>
             <View className='flex-row items-center gap-2'>
                <Ionicons name='star-outline' color='#F7434B'/>
                 <Text className='text-red font-medium'>{Math.round(Number(rating))}</Text>
             </View>
             <Pressable hitSlop={15} onPress={handleDelete} className='bg-transparent p-1 border border-amber-50/10 rounded-full gap-2'>
                <Ionicons name='remove-outline' color='#F7434B'/>
                 {/* <Text className='text-red font-medium'>{rating}</Text> */}
             </Pressable>
        </View>
      </View>
    </View>
  )
}

export default TrendCard