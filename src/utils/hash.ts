/* eslint-disable prefer-const */
export function stringToColorHex(str: string) {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use the hash to generate a vibrant color
  // Hue from the hash
  const hue = hash % 360;
  // Set high saturation and value for vibrancy
  const saturation = 80;
  const value = 90;

  // Convert HSV to RGB
  const rgb = hsvToRgb(hue, saturation, value);

  // Convert RGB to Hex
  return rgbToHex(rgb[0], rgb[1], rgb[2], str);
}

function hsvToRgb(h: number, s: number, v: number) {
  let r, g, b, i, f, p, q, t;
  s /= 100;
  v /= 100;

  h /= 60;
  i = Math.floor(h);
  f = h - i;
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [Math.round(r! * 255), Math.round(g! * 255), Math.round(b! * 255)];
}

function rgbToHex(r: number, g: number, b: number, str: string): string {
  const result = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  if (result.includes('N')) return stringToColorHex(str + 'a');

  return result;
}
