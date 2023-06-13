import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../Button/Button";

export default function Modal({
  heading,
  children,
  buttonText,
  buttonOnclick,
  openModal,
  closeModal,
  isOpen,
  width = "max-w-xl",
  height = "",
  hasCancelButton = false,
  ...props
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-Montserrat">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom=" translate-y-[20rem] opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${width} p-6 space-y-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
              >
                <Dialog.Title
                  as="div"
                  className="flex items-center w-full text-gray-900 top-4"
                >
                  <h3
                    className={`w-full text-2xl font-medium leading-6 text-center`}
                  >
                    {heading}
                  </h3>
                </Dialog.Title>

                {children}

                <div className="flex mt-4 space-x-4 h-fit">
                  {hasCancelButton ? (
                    <Button
                      customStyles="w-full"
                      type="button"
                      variation="alternative"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Cancel
                    </Button>
                  ) : null}
                  <Button
                    customStyles="w-full"
                    type="button"
                    onClick={() => {
                      buttonOnclick();
                    }}
                  >
                    {buttonText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
