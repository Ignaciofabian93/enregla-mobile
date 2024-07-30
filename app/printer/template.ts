type PrintTemplate = {
  vin?: string;
  logo?: string;
  carPlate?: string;
};

export function FullLabelTemplate({ vin, logo, carPlate }: PrintTemplate) {
  return (
    `[L]<b><font size='big'>${vin}</font></b>\n` +
    `[L]<b><font size='big'>${carPlate}</font></b>\n` +
    `[C]<img>${logo}</img>\n` +
    `[C]================================\n`
  );
}

export function VINPlateLabelTemplate({ vin, carPlate }: PrintTemplate) {
  return `[L]${vin}\n` + `[L]${carPlate}\n` + `[C]================================\n`;
}
