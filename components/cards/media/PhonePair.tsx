import Image, { type StaticImageData } from "next/image";

type Phone = { image: StaticImageData; alt: string };

/** About 30% of the card width: the frame is a third of the content width on desktop. */
const SIZES = "(min-width: 1024px) 124px, (min-width: 768px) 16vw, 30vw";

/** Two app screens side by side on the tint, the second one lower. */
export function PhonePair({ images, className = "" }: { images: readonly Phone[]; className?: string }) {
  return (
    <div className={`flex size-full items-start justify-center gap-3 bg-tint pt-4 lg:gap-3.5 lg:pt-6 ${className}`}>
      {images.map(({ image, alt }, index) => (
        <Image
          key={image.src}
          src={image}
          alt={alt}
          sizes={SIZES}
          placeholder="blur"
          className={`h-auto w-[30%] rounded-control outline-1 -outline-offset-1 outline-img-line lg:rounded-button lg:shadow-card ${index === 1 ? "mt-6 lg:mt-8" : ""}`}
        />
      ))}
    </div>
  );
}
