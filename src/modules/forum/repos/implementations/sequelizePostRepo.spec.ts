import { PostDetails } from "../../domain/postDetails";
import { IPostRepo } from "../postRepo";
import { PostRepo } from "./sequelizePostRepo";
import models from "../../../../shared/infra/database/sequelize/models";
import { ICommentRepo } from "../commentRepo";
import { IPostVotesRepo } from "../postVotesRepo";

let postRepo: IPostRepo;
let comments: ICommentRepo;
let postVotesRepo: IPostVotesRepo;

let firstItemPopularPostsList: PostDetails;
let secondItemPopularPostsList: PostDetails;
let lastItemPopularPostsList: PostDetails;

beforeAll(() => {
  postRepo = new PostRepo(models, comments, postVotesRepo);
});

describe('getPopularPosts method', () => {
  
  it('should return at least the first 5 posts ordered by points descending', async () => {
    
    const postList = await postRepo.getPopularPosts();

    expect(postList).toBeLessThanOrEqual(5);

  });
  it('the number of points of the first post must be equal or higher than the points of the second post',async () => {
    const postList = await postRepo.getPopularPosts();

    firstItemPopularPostsList = postList[0];
    secondItemPopularPostsList = postList[1];

    expect(firstItemPopularPostsList.points).toBeGreaterThanOrEqual(secondItemPopularPostsList.points);
  });
  it('the number of points of the second post must be equal or higher than the points of the last post',async () => {
    const postList = await postRepo.getPopularPosts();

    secondItemPopularPostsList = postList[1];
    lastItemPopularPostsList = postList[postList.length-1];

    expect(secondItemPopularPostsList.points).toBeGreaterThanOrEqual(lastItemPopularPostsList.points);
  });
  it('the number of points of the first post must be equal or higher than the points of the last post',async () => {
    const postList = await postRepo.getPopularPosts();

    firstItemPopularPostsList = postList[0];
    lastItemPopularPostsList = postList[postList.length-1];

    expect(lastItemPopularPostsList.points).toBeLessThanOrEqual(firstItemPopularPostsList.points);
  });    
});