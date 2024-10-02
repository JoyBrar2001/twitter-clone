import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { getPostEndpoint, QUERY_KEYS } from "../../constants";
import { useEffect } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";

const Posts = ({ feedType }) => {
  const POST_ENDPOINT = getPostEndpoint(feedType);

  const { posts, isLoading, refetch, isRefetching } = useFetchPosts(POST_ENDPOINT);

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className='flex flex-col justify-center'>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {!isLoading && posts?.length === 0 && (
        <p className='text-center my-4'>
          No posts in this tab. Switch 👻
        </p>
      )}

      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;