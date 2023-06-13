import Image from "next/image";
import Link from "next/link";
import { formatText } from "../../helper/formatText";

const RecentLargeCard = ({ post }) => {
  return (
    <Link href={`/${post?.id}`} className="relative w-full h-full rounded-xl">
      <Image
        src={post?.image || "/default_bg.jpg"}
        width={900}
        height={600}
        alt="image"
        className="object-cover h-full aspect-square rounded-xl"
      />
      <div className="absolute top-0 z-10 flex flex-col items-start justify-end w-full h-full p-8 rounded-xl bg-gradient-to-t from-black to-transparent via-black/80 md:via-black/50">
        <div className="max-h-[50%] md:max-h-[33%] w-full space-y-4">
          <p className="text-[0.6rem] md:text-sm font-light text-white/40">
            {post?.createdOn?.toDate()?.toDateString()}
          </p>
          <h3 className="text-lg font-semibold break-words md:text-2xl">
            {post?.title}
          </h3>
          <p className="text-xs font-light break-words md:text-base line-clamp-3 text-white/60">
            {formatText(post?.body)}
          </p>
          <div className="flex items-center space-x-2">
            <Image
              src={post?.author?.photoURL || "/default_bg.jpg"}
              width={100}
              height={100}
              alt="image"
              className="object-cover w-6 h-6 rounded-full lg:w-6 aspect-video"
            />
            <p className="text-xs font-light opacity-40">
              By {post?.author?.displayName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecentLargeCard;
