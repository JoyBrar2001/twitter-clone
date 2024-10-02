export const QUERY_KEYS = {
  AUTH_USER: "authUser",
  POSTS: "posts",
};

export const getPostEndpoint = (feedType) => {
  switch (feedType) {
    case "forYou":
      return "/api/post/all";
    case "following":
      return "/api/post/following";
    default:
      return "/api/post/all";
  }
};