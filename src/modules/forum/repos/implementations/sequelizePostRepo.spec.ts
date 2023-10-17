import { PostDetails } from "../../domain/postDetails";
import { PostRepo } from "./sequelizePostRepo";
import models from "../../../../shared/infra/database/sequelize/models";
import { ICommentRepo } from "../commentRepo";
import { IPostVotesRepo } from "../postVotesRepo";

let comments: ICommentRepo;
let postVotesRepo: IPostVotesRepo;

let firstItemPopularPostsList: PostDetails;
let secondItemPopularPostsList: PostDetails;
let lastItemPopularPostsList: PostDetails;

test('Should be able to get a list of the 5 most Popular Posts', async () => {
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

