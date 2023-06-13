import Image from "next/image";
import Link from "next/link";
import RecentLargeCard from "./RecentLargeCard";
import RecentMediumCard from "./RecentMediumCard";

const RecentSection = ({ recentPosts }) => {
  return (
    <div className="grid w-full h-full grid-cols-1 gap-12 lg:grid-cols-2">
      <RecentLargeCard post={recentPosts[0]} />
      <div className="flex flex-col w-full h-full divide-y">
        {recentPosts?.slice(1)?.map((recentPost) => (
          <RecentMediumCard key={recentPost.id} post={recentPost} />
        ))}
      </div>
    </div>
  );
};

export default RecentSection;
