import { Fragment, useState } from "react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useAuth } from "../../context/AuthContext";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuth } from "../../config/firebase";
import PostModal from "../Modal/PostModal";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../Button/Button";

export default function Navbar() {
  const { push } = useRouter();
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };
  const logout = async () => {
    setUser(null);
    await signOut(auth);
    push;
  };
  return (
    <>
      <PostModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="fixed top-0 z-40 flex justify-center w-screen font-Montserrat">
        <nav className="relative z-10 flex flex-row flex-wrap items-center justify-between w-full px-6 py-4 glass ">
          <div className="flex items-center justify-start space-x-3">
            <Image
              src={"/logo.png"}
              width={20}
              height={20}
              alt="image"
              className="object-cover w-6 h-6 rounded-full shadow-lg aspect-square"
            />

            <Link href="/" className="text-lg font-medium dark:text-white">
              Ghana Tek Blog
            </Link>
          </div>

          {user ? (
            <div className="flex space-x-4">
              <Button
                onClick={() => push("/posts/my-posts")}
                variation="secondary"
                customStyles="hidden md:flex"
              >
                <p>my posts</p>
              </Button>
              <Button
                onClick={() => setIsOpen(true)}
                variation="secondary"
                customStyles="hidden md:flex"
              >
                <p>create post</p>
              </Button>

              <Menu as="div" className="relative ">
                <div className="border rounded-full">
                  <Menu.Button className="flex items-center justify-center p-0 border-2 border-white rounded-full cursor-pointer w-7 h-7 hover:bg-purple-800 focus:bg-purple-800">
                    {user?.photoURL ? (
                      <Image
                        src={user?.photoURL || "/default_bg.jpg"}
                        width={100}
                        height={100}
                        alt="image"
                        className="object-cover w-6 h-6 rounded-full lg:w-6 aspect-video"
                      />
                    ) : (
                      <UserIcon className="w-4 h-4 text-white stroke-[2.5]" />
                    )}
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
                            onClick={() => push("/posts/my-posts")}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm w-full text-left md:hidden"
                            )}
                          >
                            <p>my posts</p>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setIsOpen(true)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm w-full text-left md:hidden"
                            )}
                          >
                            <p>create post</p>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm w-full text-left"
                            )}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <div>
              <Button variation="secondary" customStyles="flex" onClick={login}>
                <p>sign in with</p>
                <svg
                  width="12px"
                  height="12px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ffffff "
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#ffffff"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#ffffff"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#ffffff"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
