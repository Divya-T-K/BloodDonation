import React from 'react';

// Lightweight inline SVG icon set (no extra dependencies)
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const make = (paths) => ({ size = 20, ...props }) => (
  <svg {...base} width={size} height={size} aria-hidden="true" {...props}>
    {paths}
  </svg>
);

export const IconDrop = make(<path d="M12 2.5s6.5 6.9 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 9.4 12 2.5 12 2.5z" />);
export const IconGrid = make(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </>
);
export const IconUsers = make(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.4c1.8.8 3 2.6 3 5.6" />
  </>
);
export const IconUserPlus = make(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M19 8v6M16 11h6" />
  </>
);
export const IconClipboard = make(
  <>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 11h6M9 15h6" />
  </>
);
export const IconPlusCircle = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </>
);
export const IconLogout = make(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </>
);
export const IconSearch = make(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </>
);
export const IconMenu = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const IconCheck = make(<path d="M5 12.5l4.5 4.5L19 7.5" />);
export const IconClock = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>
);
export const IconHandshake = make(
  <>
    <path d="M3 12l4-4 4 2 4-2 6 5" />
    <path d="M7 8l-4 4 6 6 3-1 3 2 3-3" />
  </>
);
export const IconInbox = make(
  <>
    <path d="M3 13l3-8h12l3 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z" />
    <path d="M3 13h5l1 3h6l1-3h5" />
  </>
);
export const IconShield = make(<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />);
export const IconHeart = make(
  <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
);
