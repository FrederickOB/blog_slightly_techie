import { Fragment, useState } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Modal from "../../components/Modal/Modal";
import PostModal from "../Modal/PostModal";
import { deletePost } from "@/pages/api/blog";
import { formatText } from "../../helper/formatText";
import { useRouter } from "next/router";

const PostCard = ({ post, onClick }) => {
  const { push } = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <Modal
        heading={"Delete Post"}
        buttonText="Confirm"
        hasCancelButton={true}
        buttonOnclick={() => deletePost(post?.id)}
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
      >
        <p className="w-full text-center">
          Are you sure you want to delete post? 🙁
        </p>
      </Modal>
      <PostModal setIsOpen={setIsEditOpen} isOpen={isEditOpen} post={post} />
      <div
        onClick={onClick}
        className={`flex relative flex-col w-full text-black border border-purple-600 rounded-xl min-h-96 max-h-fit  transition-all ${
          onClick ? "hover:scale-[1.025] hover:shadow-xl cursor-pointer" : ""
        }`}
      >
        {!onClick ? (
          <div className="absolute z-10 right-2 top-2">
            <Menu as="div" className="relative ">
              <div className="border rounded-full">
                <Menu.Button className="flex items-center justify-center p-0 border-2 border-white rounded-full cursor-pointer w-7 h-7 hover:bg-purple-800 focus:bg-purple-800">
                  <EllipsisHorizontalIcon className="text-white bg-purple-600 rounded-full " />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => push(`/posts/${post?.id}`)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm w-full text-left "
                          )}
                        >
                          View
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setIsEditOpen(true)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm w-full text-left "
                          )}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setIsDeleteOpen(true)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm w-full text-left "
                          )}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : null}
        <Image
          src={post?.image || "/default_bg.jpg"}
          width={900}
          height={600}
          alt="image"
          className="object-cover w-full h-full aspect-video rounded-t-xl"
        />
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold leading-5 break-words line-clamp-2 ">
            {post?.title}
          </h3>
          <p className="text-sm font-light line-clamp-2 text-black/60">
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
          {post?.updatedOn ? (
            <p className="text-[0.55rem] font-light text-black/40">
              Updated On: {post?.updatedOn?.toDate()?.toDateString()}
            </p>
          ) : (
            <p className="text-[0.55rem] font-light text-black/40">
              Posted On: {post?.createdOn?.toDate()?.toDateString()}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostCard;
