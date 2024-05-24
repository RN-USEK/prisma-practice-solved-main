// import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
// import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
    const movies = await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            releaseYear: true,
            starRatings: true,
            parentalRating: true,
        }
    });
    const filteredMovies = movies.filter(movie => {
        if(movie.starRatings.length === 0) 
            return false;
        
        const averageScore = movie.starRatings.reduce((acc, starRating) => acc + starRating.score, 0) / movie.starRatings.length;
        return averageScore > n;
    }).map(movie => {
        return {
            id: movie.id,
            title: movie.title,
            releaseYear: movie.releaseYear,
            parentalRating: movie.parentalRating
        }
    });
    return filteredMovies;
};
