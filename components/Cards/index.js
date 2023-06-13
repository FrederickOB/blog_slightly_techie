import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getPosts,
  getRecentPost,
  useGetPosts,
  useGetRecentPost,
} from "./api/blog";
import RecentSection from "../../components/Recents/RecentSection";
import PostCard from "../../components/Cards/PostCard";
import Heading from "../../components/Heading/Heading";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { push } = useRouter();
  const { recentPosts } = useGetRecentPost();
  const { posts } = useGetPosts();

  return (
    <main
      className={`flex min-h-screen min-w-screen flex-col items-center justify-between bg-white  text-white`}
    >
      <div className="w-screen min-h-screen px-8 bg-black py-14 lg:p-12">
        <div className="w-full py-8 text-left h-fit">
          <h1 className="text-4xl font-bold md:text-center md:text-7xl">
            Welcome To Ghana Best Tech Blog 🇬🇭
          </h1>
        </div>
        <div className="text-left h-fit">
          {recentPosts ? (
            <>
              <Heading title="Latest Posts" />
              <RecentSection recentPosts={recentPosts} />
            </>
          ) : (
            <h1 className="py-4 text-2xl font-bold text-purple-600 md:text-4xl">
              We are coming soon with posts stay tuned 😊
            </h1>
          )}
        </div>
      </div>
      <div className="w-full min-h-screen px-8 md:p-12">
        <Heading title="All Posts" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 ">
          {posts
            ? posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => push(`/posts/${formatText(post?.body)}`)}
                />
              ))
            : null}
        </div>
      </div>
    </main>
  );
}
