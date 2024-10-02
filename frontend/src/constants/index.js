export const QUERY_KEYS = {
  AUTH_USER: "authUser",
  POSTS: "posts",
  SUGGESTED_USERS: "suggestedUsers",
  NOTIFICATIONS: "notifications",
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