"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

interface ImageProps extends Omit<NextImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  unoptimized?: boolean;
}

const Image = ({
  src,
  alt,
  fallbackSrc = "/assets/images/placeholder.jpg",
  unoptimized = false,
  placeholder = "blur",
  blurDataURL = "/assets/images/placeholder.jpg",
  ...props
}: ImageProps) => {
  const [hasError, setHasError] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const finalSrc = src && isValidUrl(src) ? src : fallbackSrc;

  if (hasError || finalSrc === fallbackSrc) {
    return <img src={fallbackSrc} alt={alt} style={{ objectFit: "cover" }} />;
  }

  return (
    <NextImage
      {...props}
      src={finalSrc}
      alt={alt}
      unoptimized={unoptimized}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={() => setHasError(true)}
    />
  );
};

export default Image;
