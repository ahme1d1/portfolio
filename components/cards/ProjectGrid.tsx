import type { ReactNode } from "react";

/** Equal cards: 3 per row from 1024px, 2 from 768px, 1 on phones. `loose` adds the 48px row gap of More projects. */
export function ProjectGrid({ loose = false, children }: { loose?: boolean; children: ReactNode }) {
  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 ${loose ? "lg:gap-y-12" : "lg:gap-y-6"}`}>
      {children}
    </div>
  );
}
