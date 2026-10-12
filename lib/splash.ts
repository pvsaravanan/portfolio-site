// Per-document state (resets on every full page load, survives client-side navigation).
// The splash belongs to loading the site through the home page; if the tab was entered
// through any other page (e.g. a project page), navigating home later must not show it.
export const splash = {
  entryIsHome: null as boolean | null,
  shown: false,
};

export const splashPending = () =>
  typeof window === 'undefined' ? true : splash.entryIsHome === true && !splash.shown;
