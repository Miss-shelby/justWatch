import type { ImageSourcePropType } from "react-native";

declare global {
  export interface TrendingMovieProps{
    title:string,
    releaseDate:string,
    rating:string,
    moviePoster:any
    
}
 export interface FavouriteMovieProps{
    title:string,
    releaseDate:string,
    rating:string,
    moviePoster:any
    id:string
    
}
 export interface RecommendedMovieProps{
 
    title:string,
    subtitle:string,
    tag:string,
    moviePoster:ImageSourcePropType
    
}
export interface TopRatedMovieProps{
    id?:string,
    tag:string,
    moviePoster:any
    
}

   
}

export {};