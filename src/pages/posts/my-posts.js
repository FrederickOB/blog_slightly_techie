import Heading from "../../../components/Heading/Heading";
import { useAuth } from "../../../context/AuthContext";
import PostCard from "../../../components/Cards/PostCard";
import { deletePost, useGetPostsBySpecificUser } from "../api/blog";
import Image from "next/image";

const Posts = () => {
  const { user } = useAuth();
  const { posts } = useGetPostsBySpecificUser(user?.uid);

  return (
    <div>
      <div className="flex w-screen px-8 space-x-8 bg-black h-fit py-14 lg:px-12 lg:pt-20">
        <Image
          src={user?.photoURL || "/default_bg.jpg"}
          width={200}
          height={200}
          alt="image"
          className="object-cover h-full aspect-square rounded-xl"
        />
        <div>
          <Heading title={user.displayName} />
          {posts ? (
            <p className="text-white"> Number of Posts: {posts?.length}</p>
          ) : null}
        </div>
      </div>
      <div className="w-full min-h-screen px-8 md:p-12">
        <Heading title="Posts" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 ">
          {posts
            ? posts.map((post) => <PostCard key={post.id} post={post} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default Posts;
