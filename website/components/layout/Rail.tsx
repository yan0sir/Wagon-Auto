/** The thin vertical rule running down the start edge (Atalanta). Desktop only; mirrors in RTL. */
export function Rail() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden lg:block">
      <div className="relative mx-auto h-full max-w-[1440px]">
        <div className="absolute inset-y-0 start-[128px] w-px bg-rule" />
      </div>
    </div>
  );
}
