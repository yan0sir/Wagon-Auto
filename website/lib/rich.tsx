import type { ReactNode } from "react";

/**
 * Renders `**text**` segments as red highlight blocks (see `.hl` in globals.css).
 *
 * All text is wrapped in `position: relative` spans so it paints in a layer above every
 * highlight background. Without this, a red block on one line covers the descenders
 * (g, p, y…) of the line above it.
 */
export function rich(text: string): ReactNode {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="hl">
        <span className="relative">{part}</span>
      </span>
    ) : (
      <span key={i} className="relative">
        {part}
      </span>
    ),
  );
}

/** Same text with the highlight markers removed (for metadata, aria labels). */
export const plain = (text: string) => text.replaceAll("**", "");
