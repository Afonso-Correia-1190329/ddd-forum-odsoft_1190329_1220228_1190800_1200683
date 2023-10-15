import { PostDetails } from "../../domain/postDetails";
import { IPostRepo } from "../postRepo";
import { PostRepo } from "./sequelizePostRepo";
import models from "../../../../shared/infra/database/sequelize/models";
import { ICommentRepo } from "../commentRepo";
import { IPostVotesRepo } from "../postVotesRepo";
import { MemberDetails } from "../../domain/memberDetails";
import { PostSlug } from "../../domain/postSlug";
import { PostTitle } from "../../domain/postTitle";
/*
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
}); */

let comments: ICommentRepo;
let postVotesRepo: IPostVotesRepo;

let firstItemPopularPostsList: PostDetails;
let secondItemPopularPostsList: PostDetails;
let lastItemPopularPostsList: PostDetails;

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

