import { spinner } from "components/Spinner/spinner";
import React from "react";

export default function Button({
  type = "button",
  children,
  variation = "primary",
  onClick,
  processing = false,
  leftIcon,
  rightIcon,
  disabled,
  customStyles,
  ...props
}) {
  const style = {
    primary:
      "items-center  px-2 py-1 space-x-2  text-xs text-white border-2 border-purple-600 rounded-xl bg-purple-600 hover:bg-purple-800 hover:scale-[1.02] ",
    secondary:
      "items-center px-2 py-1 space-x-2 text-xs text-white border-2 rounded-xl hover:scale-[1.02] ",
    alternative:
      "items-center  px-2 py-1 space-x-2 text-purple-600 text-xs  border-2 border-purple-600 rounded-xl hover:bg-purple-600/40 hover:scale-[1.02] ",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={style[variation] + customStyles}
      {...props}
    >
      {leftIcon ? <div className="absolute left-3"> {leftIcon}</div> : null}
      {children}
      {processing ? <div className="w-5 ml-3">{spinner("")} </div> : null}
      {rightIcon ? <div className="absolute right-3"> {rightIcon}</div> : null}
    </button>
  );
}
