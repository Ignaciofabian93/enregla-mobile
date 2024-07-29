type PrintTemplate = {
  vin: string;
  logo: string;
  carPlate: string;
};

export default function LabelTemplate({ vin, logo, carPlate }: PrintTemplate) {
  return (
    `[L]${vin}\n` +
    `[L]${carPlate}\n` +
    `<img>${logo}</img>\n` +
    `[C]================================\n`
  );
}
