export default function LabelTemplate(vin: string, logo: string, carPlate: string) {
  return (
    `[C]<u><font size='big'>VIN LABEL</font></u>\n` +
    `[L]\n` +
    `[C]================================\n` +
    `[L]\n` +
    `[L]<b>VIN:</b>[R]${vin}\n` +
    `[L]<b>Plate:</b>[R]${carPlate}\n` +
    `[L]\n` +
    `[C]${logo}\n` +
    `[L]\n` +
    `[C]================================\n`
  );
}
