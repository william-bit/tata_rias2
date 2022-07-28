import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  content: React.ReactNode;
  title: string;
  widthAndHeight: {
    width: string;
    height: string;
  };
}
export default function Modal({
  isOpen,
  closeModal,
  title,
  content,
  widthAndHeight,
}: IModal) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    height: widthAndHeight.height,
                    width: widthAndHeight.width,
                  }}
                  className="p-6 overflow-hidden text-left align-middle transition-all transform rounded shadow-xl bg-gray-50"
                >
                  <Dialog.Title
                    as="div"
                    className="flex justify-between pb-3 text-lg font-medium leading-6 text-gray-900 border-b border-gray-300"
                  >
                    <div>{title}</div>
                    <div>
                      <XIcon
                        onClick={closeModal}
                        className="text-gray-600 cursor-pointer hover:text-gray-500 w-7 h-7"
                      ></XIcon>
                    </div>
                  </Dialog.Title>
                  {content}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
