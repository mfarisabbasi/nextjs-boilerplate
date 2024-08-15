import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

const CustomButton = ({
  to,
  type,
  label,
  bgColor,
  textColor,
  hoverBg,
  hoverTextColor,
  borderColor,
  hoverBorderColor,
  onClick,
  loading,
  isBack,
  wFull,
}) => {
  return (
    <>
      {type ? (
        <button
          onClick={onClick}
          className={`${bgColor ? bgColor : "bg-primary"} ${
            hoverBg ? hoverBg : "hover:bg-transparent"
          } ${textColor ? textColor : "text-white"} ${
            hoverTextColor ? hoverTextColor : "hover:text-primary"
          } ${borderColor ? borderColor : "border-primary"} ${
            hoverBorderColor ? hoverBorderColor : "border-primary"
          } border transition duration-500 py-2 px-4 rounded-2xl ${
            wFull ? "w-full" : ""
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <MoonLoader color="#ffffff" size={19} />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              {isBack && <ArrowUpLeft />}
              {label}
            </div>
          )}
        </button>
      ) : (
        <Link
          href={to}
          className={`${bgColor ? bgColor : "bg-primary"} ${
            hoverBg ? hoverBg : "hover:bg-transparent"
          } ${textColor ? textColor : "text-white"} ${
            hoverTextColor ? hoverTextColor : "hover:text-primary"
          } ${borderColor ? borderColor : "border-primary"} ${
            hoverBorderColor ? hoverBorderColor : "border-primary"
          } border transition duration-500 py-2 px-4 rounded-2xl ${
            wFull ? "w-full" : ""
          }`}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default CustomButton;
