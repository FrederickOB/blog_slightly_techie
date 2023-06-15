import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ImageUpload = ({ value, onChange, label, name, id, error }) => {
  const [uploadedPicUrl, setUploadedPicUrl] = useState(null);

  return (
    <div>
      <label className="block text-sm font-bold text-black capitalize ">
        {label}:
      </label>
      <div className="flex-col items-start my-2 space-y-5 text-center md:flex">
        {!uploadedPicUrl ? (
          <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-lg">
            <PhotoIcon className="w-10 h-10" />
          </div>
        ) : (
          <div className="h-28 max-w-20 aspect-auto">
            <Image
              src={uploadedPicUrl}
              alt="profile pic"
              height={500}
              width={500}
              className="object-cover w-full rounded-lg h-28 aspect-square"
            />
          </div>
        )}
        <div className="px-3 py-2 text-sm font-medium leading-4 text-white bg-purple-600 rounded-md shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2">
          <label htmlFor={name}>
            <span>{uploadedPicUrl ? "change image" : "choose image"}</span>
            <input
              id={id}
              name={name}
              type="file"
              accept="image/*"
              className="sr-only "
              // value={values.profile_picture}
              onChange={(event) => {
                if (event.currentTarget.files[0]) {
                  onChange(event.currentTarget.files[0]);

                  setUploadedPicUrl(
                    URL?.createObjectURL(event.currentTarget.files[0])
                  );
                }
              }}
            />
          </label>
        </div>
        <p className="text-xs text-left text-gray-500 ">PNG or JPG up to 5MB</p>
      </div>
      <p className="mt-4 text-xs text-gray-500">
        uploaded file name: {value?.name}
      </p>
    </div>
  );
};

export default ImageUpload;
