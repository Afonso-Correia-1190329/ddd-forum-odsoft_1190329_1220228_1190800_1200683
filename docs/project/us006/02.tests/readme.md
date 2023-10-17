# US 006 - Development (Popular Posts Listing)

# 1. Tests

**Test 1:** Check that the Popular Posts feature returns 5 posts at maximum.

    describe("Posts endpoint", (): void => {
        beforeAll(async (): Promise<void> => {
            posts = new Posts();
            
            log.debug("1. Posts Base url: "+posts.getBaseUrl());
        });

        it("Get popular posts", async (): Promise<void> => {
            const response = await posts.getPopularPosts();
            expect(response.status).toBe(200);
            
            expect(response.data.posts).toBeDefined();
            expect(response.data.posts.length).toBeLessThanOrEqual(5);
        });
    });

**Test 2:** Check that the GetPopularPosts method in PostRepo, returns 5 posts at maximum, then check that they're are ordered by points descending.

    describe('Should be able to get a list of the 5 most Popular Posts', async () => {
        let postRepo = new PostRepo(models, comments, postVotesRepo);
        let popularPostsList: PostDetails[] = [];

        postRepo.getPopularPosts().then((results) => {
            popularPostsList = results;

            //expect(popularPostsList).toEqual(expectedPostDetails);

            if(popularPostsList.length > 0){
            expect(popularPostsList).toBeLessThanOrEqual(5);
            firstItemPopularPostsList = popularPostsList[0];
            secondItemPopularPostsList = popularPostsList[1];
            lastItemPopularPostsList = popularPostsList[popularPostsList.length - 1]
            expect(firstItemPopularPostsList.points).toBeGreaterThanOrEqual(secondItemPopularPostsList.points);
            expect(secondItemPopularPostsList.points).toBeGreaterThanOrEqual(lastItemPopularPostsList.points);
            expect(lastItemPopularPostsList.points).toBeLessThanOrEqual(firstItemPopularPostsList.points);
            }
        });
    });
