export function urlsToAnchors(text: string): string {
  const urlRegex: RegExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  return text.replace(urlRegex, (url: string) => `<a class="text-blue-900" href="${url}">${url}</a>`);
}