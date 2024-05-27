import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
    try {
        await prisma.starRating.deleteMany({
            where: {
                user: {
                    age: {
                        lt: n,
                    },
                },
            },
        });
        const result = await prisma.user.deleteMany({
            where: {
                age: {
                    lt: n,
                },
            },
        });
        return result;
    } catch (error) {
        console.error("Error deleting users:", error);
        throw error;
    }
};
