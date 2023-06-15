import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getPost, useGetPost } from "../api/blog";
import { formatText } from "../../../helper/formatText";

const PostId = () => {
  const { query } = useRouter();
  const { post_id } = query;
  const [post, setPost] = useState({});

  useEffect(() => {
    if (post_id) {
      getPost(post_id).then((res) => setPost(res));
    }
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <div className="h-[50vh] bg-purple-600 w-screen hidden lg:flex"></div>
      <div className="w-full min-h-screen py-10 lg:px-12 lg:py-0 lg:absolute lg:top-20 lg:left-[50%] lg:-translate-x-[50%]">
        <div className="relative w-full h-[50vh] lg:h-full rounded-xl">
          <Image
            src={post?.image || "/default_bg.jpg"}
            width={900}
            height={600}
            alt="image"
            className="object-cover w-full h-full lg:rounded-xl"
          />
          <div className="absolute top-0 z-10 flex flex-col items-start justify-end w-full h-full p-8 lg:rounded-xl bg-gradient-to-t from-black to-transparent via-black/80 lg:via-black/50">
            <div className="max-h-[50%]  w-full space-y-4">
              <h3 className="text-2xl font-semibold text-purple-600 break-words lg:text-7xl">
                {post?.title}
              </h3>

              <div className="flex items-center w-full space-x-2">
                <Image
                  src={post?.author?.photoURL || "/default_bg.jpg"}
                  width={100}
                  height={100}
                  alt="image"
                  className="object-cover w-10 h-10 rounded-full lg:w-12 lg:h-12 aspect-video"
                />
                <div className="flex flex-col">
                  <p className="font-light text-white opacity-40">
                    By {post?.author?.displayName}
                  </p>
                  {post?.updatedOn ? (
                    <p className="text-[0.6rem] lg:text-sm font-light text-white/40 ">
                      Updated On: {post?.updatedOn?.toDate()?.toDateString()}
                    </p>
                  ) : (
                    <p className="text-[0.6rem] lg:text-sm font-light text-white/40 ">
                      {post?.createdOn?.toDate()?.toDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <article className="w-full px-8 py-12 prose-lg whitespace-pre-line lg:text-lg lg:px-0">
            {formatText(post?.body)}
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostId;
