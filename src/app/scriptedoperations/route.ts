// Permanently removed page — respond 410 so crawlers stop retrying it,
// rather than a bare 404 (which search engines keep re-checking indefinitely).
// Moved pages belong in `redirects()` in next.config.js.
function gone() {
  return new Response('Gone', { status: 410 })
}

export const GET = gone
export const HEAD = gone
