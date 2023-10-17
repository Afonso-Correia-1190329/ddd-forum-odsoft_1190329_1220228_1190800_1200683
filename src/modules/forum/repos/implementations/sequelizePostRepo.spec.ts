const expectedPostDetails: any[] = [
  { 
    points: 5
  },
  {
    points: 4
  },
  {
    points: 3
  },
  {
    points: 2
  },
  {
    points: 1
  }
];

class FakePostRepo {
  getPopularPosts() {
    return expectedPostDetails;
  }
}

const postRepo: FakePostRepo = new FakePostRepo();

let firstItemPopularPostsList: any;
let secondItemPopularPostsList: any;
let lastItemPopularPostsList: any; 


test('Should be able to get a list of the 5 most Popular Posts', async () => {
  let popularPostsList = postRepo.getPopularPosts();

  expect(popularPostsList).toEqual(expectedPostDetails);
  if(popularPostsList.length > 0){
    expect(popularPostsList.length).toBeLessThanOrEqual(5);
    firstItemPopularPostsList = popularPostsList[0];
    secondItemPopularPostsList = popularPostsList[1];
    lastItemPopularPostsList = popularPostsList[popularPostsList.length - 1]
    expect(firstItemPopularPostsList.points).toBeGreaterThanOrEqual(secondItemPopularPostsList.points);
    expect(secondItemPopularPostsList.points).toBeGreaterThanOrEqual(lastItemPopularPostsList.points);
    expect(lastItemPopularPostsList.points).toBeLessThanOrEqual(firstItemPopularPostsList.points);
  }
});