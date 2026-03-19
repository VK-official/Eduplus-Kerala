export function getDirectLink(url: string): string {
  if (!url) return "";
  try {
    const match = url.match(/\/d\/(.+?)(?:\/|$)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  } catch (error) {
    return url;
  }
  return url;
}
