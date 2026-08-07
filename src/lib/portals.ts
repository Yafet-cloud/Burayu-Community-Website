/**
 * External government portals linked from the E-service pages.
 * Kept in one place so the URLs can be updated without touching the UI.
 */
export const LIBRARY_PORTAL_URL = "http://196.189.124.193:8000/login";
export const LAND_PORTAL_URL = "http://196.189.124.252/sheger/Account/Login";

/**
 * Opens an external portal in a new tab.
 *
 * Anchors with target="_blank" are silently dropped inside sandboxed
 * iframes and by some popup blockers, which makes the
 * button look dead. We open programmatically and, if the browser refuses to
 * give us a window handle, fall back to a top-level navigation.
 */
export function openPortal(url: string) {
  if (typeof window === "undefined") return;

  let opened: Window | null = null;
  try {
    opened = window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    opened = null;
  }

  if (!opened) {
    try {
      (window.top ?? window).location.href = url;
    } catch {
      window.location.href = url;
    }
  }
}
