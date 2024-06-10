import { prisma } from "./prisma";

// Get the average age of all users
// hint: the hot tub is hot, the water is great, to solve this problem you should "aggregate"
type AverageAgeResult = {
  _avg: {
    age: number | null;
  };
};
export const getAverageUserAge = () => {
  return prisma.user
    .aggregate({
      _avg: {
        age: true,
      },
    })
    .then((averageAge: AverageAgeResult) => averageAge._avg.age);
};
