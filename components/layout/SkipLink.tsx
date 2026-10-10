export function SkipLink({ label, targetId }: { label: string; targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="fixed start-4 top-4 z-50 -translate-y-[200%] rounded-control bg-inverse px-4 py-3 text-[15px] font-semibold text-on-inverse transition-[background-color,transform] duration-200 ease-enter hover:bg-ink-2 focus-visible:translate-y-0"
    >
      {label}
    </a>
  );
}
