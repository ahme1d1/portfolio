import type { StaticImageData } from "next/image";
import { Img } from "@/components/ui/Img";

type Phone = { image: StaticImageData; alt: string };

/** "card": about 30% of a project card. "next": about 26% of the next-case card's 380px frame. */
const VARIANTS = {
  card: {
    sizes: "(min-width: 1024px) 124px, (min-width: 768px) 16vw, 30vw",
    phone: "w-[30%] rounded-control lg:rounded-button",
    lower: "mt-6 lg:mt-8",
  },
  next: {
    sizes: "(min-width: 768px) 100px, 26vw",
    phone: "w-[26%] rounded-[10px] md:rounded-control",
    lower: "mt-5 md:mt-6",
  },
} as const;

type PhonePairProps = { images: readonly Phone[]; variant?: keyof typeof VARIANTS; className?: string };

/** Two app screens side by side on the tint, the second one lower. */
export function PhonePair({ images, variant = "card", className = "" }: PhonePairProps) {
  const style = VARIANTS[variant];
  return (
    <div className={`flex size-full items-start justify-center gap-3 bg-tint pt-4 lg:gap-3.5 lg:pt-6 ${className}`}>
      {images.map(({ image, alt }, index) => (
        <Img
          key={image.src}
          src={image}
          alt={alt}
          sizes={style.sizes}
          className={`h-auto bg-surface outline-1 -outline-offset-1 outline-img-line lg:shadow-card ${style.phone} ${index === 1 ? style.lower : ""}`}
        />
      ))}
    </div>
  );
}
