type PrintTemplate = {
  vin?: string;
  logo?: string;
  carPlate?: string;
};

export function FullLabelTemplate({ vin, logo, carPlate }: PrintTemplate) {
  return (
    `[L]<b><font size='big'>${vin}</font></b>\n` +
    `[L]<b><font size='big'>${carPlate}</font></b>\n` +
    `[C]================================\n` +
    `[C]<img>${logo}</img>\n` +
    `[C]================================\n`
  );
}

export function VINPlateLabelTemplate({ vin, carPlate }: PrintTemplate) {
  return (
    `[L]<b><font size='big'>${vin}</font></b>\n` + `[L]<b><font size='big'>${carPlate}</font></b>\n`
  );
}

export function Logo64LabelTemplate({ logo }: PrintTemplate) {
  return (
    `[C]================================\n` +
    `[C]<img>${logo}</img>\n` +
    `[C]================================\n`
  );
}

export function PNGLabelTemplate({ logo }: PrintTemplate) {
  return (
    `[C]================================\n` +
    `[C]<img>${logo}</img>\n` +
    `[C]================================\n`
  );
}

export function URLLabelTemplate() {
  return (
    `[C]================================\n` +
    `[C]<img>https://via.placeholder.com/300.jpg</img>\n` +
    `[C]================================\n`
  );
}
