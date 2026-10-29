import { Fragment, type ReactNode } from "react";

/** Renders `**text**` segments as red highlight blocks (see `.hl` in globals.css). */
export function rich(text: string): ReactNode {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="hl">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Same text with the highlight markers removed (for metadata, aria labels). */
export const plain = (text: string) => text.replaceAll("**", "");
