import { Rich } from "@/components/ui/Rich";
import { TextLink } from "@/components/ui/TextLink";
import type { ResolvedLink } from "./href";

type SeenInProps = {
  label: string;
  links: readonly ResolvedLink[];
  className?: string;
};

/** "Seen in:" and the work that shows the service: a wrapping row, a column of 44px rows on phones. */
export function SeenIn({ label, links, className = "" }: SeenInProps) {
  return (
    <div className={`flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-5 ${className}`}>
      <span className="text-sm text-muted lg:text-[15px]">{label}</span>
      {links.map((link) => (
        <TextLink key={link.href} href={link.href} className="text-[15px]">
          <Rich text={link.label} />
        </TextLink>
      ))}
    </div>
  );
}
