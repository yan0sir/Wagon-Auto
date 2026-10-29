import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true } as const;

/** Points to the reading direction's "forward" (flips in RTL). */
export const ArrowIcon = ({ className = "", ...p }: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} className={`rtl:-scale-x-100 ${className}`} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
  </svg>
);

export const ArrowUpRightIcon = ({ className = "", ...p }: P) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} className={`rtl:-scale-x-100 ${className}`} {...p}>
    <path d="M7 17 17 7M8 7h9v9" strokeLinecap="square" />
  </svg>
);

/** Chat bubble with handset, used for WhatsApp actions. */
export const ChatIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.6 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.5Z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M3 5.5h18v13H3z" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

export const PauseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden {...p}>
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
);

export const PlayIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden {...p}>
    <path d="M6 4l14 8-14 8z" />
  </svg>
);

export const PlusIcon = ({ className = "", ...p }: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} className={className} {...p}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M3 8h18M3 16h18" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
  </svg>
);

/** The logo's dark-red fold diamond, used as a list marker. */
export const FoldMark = ({ className = "", ...p }: P) => (
  <svg viewBox="0 0 31 53" width="8" height="13" aria-hidden className={className} {...p}>
    <path d="M17.7 0 30.6 20.7 13 52.2 0 30.2Z" fill="currentColor" />
  </svg>
);
