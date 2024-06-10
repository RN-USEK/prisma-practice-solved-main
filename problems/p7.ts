import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = (userId: number) => {
  return prisma.starRating
    .aggregate({
      where: {
        userId,
      },
      _avg: {
        score: true,
      },
    })
    .then((data) => data._avg.score);

  //   const userWithRatings = await prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //     select: {
  //       starRatings: {
  //         select: {
  //           score: true,
  //         },
  //       },
  //     },
  //   });
  //   if (!userWithRatings) return 0;
  //   return (
  //     userWithRatings.starRatings.reduce(
  //       (acc: any, curr: { score: any }) => acc + curr.score,
  //       0
  //     ) / userWithRatings.starRatings.length
  //   );
};
