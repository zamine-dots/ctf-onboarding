import type { ReactNode } from "react";

interface Props {
  sector: string;
  className?: string;
}

/** Simple 24×24 stroke glyphs, one per sector. currentColor inherits the sector accent. */
const paths: Record<string, ReactNode> = {
  prologue: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M7 10l2.5 2.5L7 15M12.5 15.5H17" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z" />
    </>
  ),
  crypto: (
    <>
      <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 018 0v3.5M12 14.5v2.5" />
    </>
  ),
  forensics: (
    <>
      <path d="M13.5 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8.5z" />
      <path d="M13.5 3v5.5H19" />
      <circle cx="11.5" cy="13.5" r="2.5" />
      <path d="M13.4 15.4L16 18" />
    </>
  ),
  reverse: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10.5 3v4M13.5 3v4M10.5 17v4M13.5 17v4M3 10.5h4M3 13.5h4M17 10.5h4M17 13.5h4" />
    </>
  ),
  pwn: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="2.2" />
    </>
  ),
  osint: (
    <>
      <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  stego: (
    <>
      <rect x="3" y="3" width="18" height="14" rx="2.5" />
      <path d="M3 13l4.5-4 4 3.5 3-2.5L21 15" />
      <path d="M6.5 21h11" />
    </>
  ),
  misc: (
    <>
      <path d="M8.5 4.5L4 12l4.5 7.5M15.5 4.5L20 12l-4.5 7.5" />
      <path d="M13.5 8l-3 8" />
    </>
  ),
};

export default function SectorIcon({ sector, className = "w-5 h-5" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[sector] ?? paths.misc}
    </svg>
  );
}
