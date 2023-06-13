import Image from "next/image";
import Link from "next/link";

const RecentMediumCard = ({ post }) => {
  return (
    <Link
      href={`/posts/${formatText(post?.body)}`}
      className="flex w-full py-4 space-x-4 lg:py-8 lg:px-4 lg:h-1/3"
    >
      <Image
        src={post?.image || "/default_bg.jpg"}
        width={900}
        height={600}
        alt="image"
        className="object-cover w-1/3 h-full lg:w-1/3 lg:aspect-video rounded-xl"
      />
      <div>
        <p className="text-xs font-light lg:text-sm text-white/40">
          {post?.createdOn?.toDate()?.toDateString()}
        </p>
        <h3 className="text-sm font-semibold text-white lg:text-xl">
          {post?.title}
        </h3>
      </div>
    </Link>
  );
};

export default RecentMediumCard;
