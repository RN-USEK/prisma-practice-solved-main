import { prisma } from "./prisma";
// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  return findCriticId("asc");
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  return findCriticId("desc");
};

const findCriticId = async (order: "asc" | "desc") => {
  const result = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
    orderBy: {
      _avg: {
        score: order,
      },
    },
    take: 1,
  });
  if (!result) return undefined;
  return result[0].userId;
};
