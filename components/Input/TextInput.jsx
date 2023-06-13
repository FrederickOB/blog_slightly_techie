import React from "react";

export const TextInput = ({ label, icon, error, ...props }) => {
  return (
    <>
      {label ? (
        <p className="mb-1 text-sm font-bold capitalize">{label}:</p>
      ) : null}
      <div className="flex items-center px-3 py-2 font-medium bg-white border-2 border-black rounded-lg placeholder:font-normal hover:border-purple-600 focus-within:border-purple-600 hover:text-purple-600 focus-within:text-purple-600">
        {icon}
        <input
          className="w-full py-0 pl-2 border-transparent border-none focus:border-transparent focus:ring-0 focus:outline-none"
          {...props}
        />
      </div>
      {error ? <InputError>{error}</InputError> : null}
    </>
  );
};

export const TextArea = ({ label, error, ...props }) => {
  return (
    <>
      {label ? (
        <p className="mb-1 text-sm font-bold capitalize">{label}:</p>
      ) : null}
      <div className="flex items-center px-3 py-2 font-medium bg-white border-2 border-black rounded-lg placeholder:font-normal hover:border-purple-600 focus-within:border-purple-600 hover:text-purple-600 focus-within:text-purple-600">
        <textarea
          className="w-full py-0 pl-2 border-transparent border-none focus:outline-none focus:border-transparent focus:ring-0"
          {...props}
        />
      </div>
      {error ? <InputError>{error}</InputError> : null}
    </>
  );
};

export const InputError = ({ children }) => (
  <p className="mt-1 text-xs text-red-500">{children}</p>
);
