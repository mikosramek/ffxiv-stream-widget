
//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex, alpha) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: parseFloat(alpha)
  } : null;
}