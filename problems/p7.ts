import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
   const userWithRatings = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            starRatings:{
                select:{
                    score:true
                },
            },
        },
    });
    return userWithRatings?userWithRatings.starRatings.reduce((acc, curr) => acc + curr.score, 0) / userWithRatings.starRatings.length:0;
};
