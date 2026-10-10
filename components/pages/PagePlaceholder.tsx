/** Stand-in until the page is built from its board (phases 3 to 5). */
export function PagePlaceholder({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-8 pb-14 lg:px-10 lg:pt-18 lg:pb-32">
      <h1 className="type-h1">{title}</h1>
    </section>
  );
}
