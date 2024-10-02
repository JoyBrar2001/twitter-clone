import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import { getPostEndpoint, QUERY_KEYS } from "../../constants";
import { useEffect } from "react";

const Posts = ({ feedType }) => {
  const POST_ENDPOINT = getPostEndpoint(feedType);

  const { data: posts, isLoading, refetch, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT);
        const data = await res.json();

        if(!res.ok){
          throw new Error(data.error || "Error loading posts");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

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