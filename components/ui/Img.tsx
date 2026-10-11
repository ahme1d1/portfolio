import { getImageProps, type ImageProps } from "next/image";

type ImgProps = Omit<ImageProps, "placeholder" | "blurDataURL" | "style" | "fill" | "preload" | "priority"> & {
  className?: string;
};

/**
 * next/image's sized, responsive <img> without its inline `style`: the Content-Security-Policy allows
 * no style attributes (docs/SPEC.md "Security headers"). `text-transparent` does what that style did,
 * hiding the alt text while the image loads. A server component, so no image ships client code.
 */
export function Img({ className = "", ...image }: ImgProps) {
  const {
    props: { style: _style, alt, ...props },
  } = getImageProps(image);
  // eslint-disable-next-line @next/next/no-img-element -- the props come from next/image; only the style is dropped.
  return <img alt={alt} {...props} className={`text-transparent ${className}`.trim()} />;
}
