import { cn } from "@/lib/utils";
import "./Button.css";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  variants?: "primary" | "secondary";
  size?: "md" | "lg";
}
const AnimatedButton = ({
  className = "",
  text = "",
  variants = "primary",
  size = "md",
  ...props
}: AnimatedButtonProps) => {
  const variantStyles = {
    primary: "bg-color1 text-white hover:bg-color2 hover:text-black",
    secondary: "bg-color2 text-black hover:bg-color1 hover:text-white",
  };

  const sizeStyles = {
    md: "px-[30px] py-[8px] text-[14px] leading-[22.4px]",
    lg: "px-[40px] py-[10px] text-[18px] leading-[34.2px]",
  };

  return (
    <span className={cn("relative inline-block", className)}>
      <button
        className={cn(
          `main-btn font-extrabold w-full cursor-pointer rounded-none transition-colors duration-300`,
          variantStyles[variants || "primary"],
          sizeStyles[size || "md"]
        )}
        {...props}
      >
        <span>{text}</span>
      </button>
    </span>
  );
};

export default AnimatedButton;
