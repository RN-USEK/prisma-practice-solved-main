import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const userMovies = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      starRatings: {
        select: {
          movie: true,
        },
      },
    },
  });
  if (!userMovies) return [];
  return userMovies.starRatings.map((starRating) => starRating.movie);
};
