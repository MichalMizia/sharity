import React, { HTMLAttributes } from "react";
import ProfilePicturePlaceholder from "/blank_profile_picture.png";
import { cn } from "@/lib/utils";

interface PicturePlaceholderProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
}

const PicturePlaceholder: React.FC<PicturePlaceholderProps> = ({
  src = ProfilePicturePlaceholder,
  alt = "Profile Picture",
  className,
  ...rest
}) => {
  return (
    <img
      aria-hidden
      src={src}
      alt={alt}
      className={cn("", className)}
      {...rest}
    />
  );
};

export default PicturePlaceholder;
