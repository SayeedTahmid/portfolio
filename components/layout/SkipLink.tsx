/** First focusable element on every page; lets keyboard users jump past the header. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-btn focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-btn"
    >
      Skip to content
    </a>
  );
}
