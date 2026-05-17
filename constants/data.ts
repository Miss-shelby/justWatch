import { ImageSourcePropType } from "react-native";
import image from "./image";


export const trendingMovies:TrendingMovieProps[] = [
    {
        title:"American pie",
        releaseDate:"2023.143",
        rating:"4.5",
        moviePoster:image.moviePosterThree
    },
     {
        title:"Professor",
        releaseDate:"2021.232",
        rating:"3.0",
        moviePoster:image.moviePosterTwo
    },
    {
        title:"The God Father",
        releaseDate:"2023.143",
        rating:"4.0",
        moviePoster:image.godFather
    },
    
     {
        title:"Summer I turned Pretty",
        releaseDate:"2020.143",
        rating:"4.0",
        moviePoster:image.summerImg
    },
    {
        title:"Gilmore Girls",
        releaseDate:"1999.143",
        rating:"5.0",
        moviePoster:image.gilmoreGirls
    }
]

export const recommendedMovies:RecommendedMovieProps[] = [
    {
        title:"American pie",
        subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quis.",
        tag:"must watch",
        moviePoster:image.americanPie
    },
     {
        title:"The God Father",
        subtitle:"2023.143",
        tag:"AWARD WINNING",
        moviePoster:image.godFather
    },
     {
        title:"Summer I turned Pretty",
        subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quis.",
        tag:"AWARD WINNING",
        moviePoster:image.summerImg
    },
    {
        title:"Gilmore Girls",
        subtitle:"NEW RELEASE",
        tag:"5.0",
        moviePoster:image.gilmoreGirls
    }
]

export const topRatedMovies:TopRatedMovieProps[] = [
    {
        id:'1',
        tag:"",
        moviePoster:image.moviePoster
    },
     {
        id:"2",
        tag:"",
        moviePoster:image.summerImg
    },
     {
        id:"3",
        tag:"",
        moviePoster:image.gilmoreGirls
    },
    {
        id:"4",
        tag:"",
        moviePoster:image.godFather
    }
]