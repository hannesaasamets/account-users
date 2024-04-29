function shiftColorPalette(inputPalette, targetColors) {
  const inputKeys = Object.keys(inputPalette);
  const outputPalette = {};

  // Calculate the RGB shifts needed for each color
  for (let i = 0; i < inputKeys.length; i++) {
    const key = inputKeys[i];
    const inputColor = inputPalette[key];

    // Get the index of the nearest target color
    const nearestColorIndex = getNearestColorIndex(inputColor, targetColors);
    const targetColor = targetColors[nearestColorIndex];

    // Calculate RGB shifts
    const shiftR = targetColor[0] - inputColor[0];
    const shiftG = targetColor[1] - inputColor[1];
    const shiftB = targetColor[2] - inputColor[2];

    // Apply shifts to the input color
    const shiftedColor = [
      inputColor[0] + shiftR,
      inputColor[1] + shiftG,
      inputColor[2] + shiftB,
    ];

    // Store the shifted color in the output palette
    outputPalette[key] = `rgb(${shiftedColor.join(', ')})`;

    // Adjust darker shades for values above --surface-700
    if (parseInt(key.split('-')[2]) > 700) {
      const darkShift = 20; // Amount to darken the color

      const darkenedColor = [
        Math.max(shiftedColor[0] - darkShift, 0),
        Math.max(shiftedColor[1] - darkShift, 0),
        Math.max(shiftedColor[2] - darkShift, 0),
      ];

      outputPalette[key] = `rgb(${darkenedColor.join(', ')})`;
    }
  }

  return outputPalette;
}

function getNearestColorIndex(color, targetColors) {
  let minDistance = Infinity;
  let nearestIndex = 0;

  for (let i = 0; i < targetColors.length; i++) {
    const targetColor = targetColors[i];
    const distance = colorDistance(color, targetColor);

    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = i;
    }
  }

  return nearestIndex;
}

function colorDistance(color1, color2) {
  const dr = color1[0] - color2[0];
  const dg = color1[1] - color2[1];
  const db = color1[2] - color2[2];

  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/* eslint-disable array-bracket-newline, array-element-newline */
const inputPaletteLara = {
  '--surface-0': [255, 255, 255],
  '--surface-50': [249, 250, 251],
  '--surface-100': [243, 244, 246],
  '--surface-200': [229, 231, 235],
  '--surface-300': [209, 213, 219],
  '--surface-400': [156, 163, 175],
  '--surface-500': [107, 114, 128],
  '--surface-600': [75, 85, 99],
  '--surface-700': [55, 65, 81],
  '--surface-800': [31, 41, 55],
  '--surface-900': [17, 24, 39],
  '--surface-950': [8, 8, 8],
};

const targetColorsKlaus = [
  [247, 250, 252],
  [237, 242, 247],
  [226, 232, 240],
  [203, 213, 224],
  [160, 174, 192],
  [113, 128, 150],
  [45, 55, 72],
  [74, 85, 104],
];
/* eslint-enable */

const shiftedPalette = shiftColorPalette(inputPaletteLara, targetColorsKlaus);

console.log(shiftedPalette);
