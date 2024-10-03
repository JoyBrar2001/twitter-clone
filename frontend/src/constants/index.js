export const QUERY_KEYS = {
  AUTH_USER: "authUser",
  POSTS: "posts",
  SUGGESTED_USERS: "suggestedUsers",
  NOTIFICATIONS: "notifications",
  USER_PROFILE: "userProfile",
};

export const getPostEndpoint = (feedType, username) => {
  switch (feedType) {
    case "forYou":
      return "/api/post/all";
    case "following":
      return "/api/post/following";
    case "posts":
      return `/api/post/user/${username}`;
    case "likes":
      return `/api/post/likes/${username}`;
    default:
      return "/api/post/all";
  }
};