export function getImageUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `http://localhost:3000${url}`;
  }
  return `/images/${url}`;
}
