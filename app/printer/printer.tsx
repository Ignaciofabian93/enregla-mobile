import ThermalPrinterModule from "react-native-thermal-printer";

ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  macAddress: "88:12:e4:41:78:39",
  timeout: 30000,
};

export async function GetBluetoothDevices() {
  const devices = await ThermalPrinterModule.getBluetoothDeviceList();
  return devices;
}

export async function PrintLabelTCP(label: string) {
  try {
    console.log("ejecutando funcion para imprimir etiqueta");
    await ThermalPrinterModule.printTcp({ payload: label });
  } catch (error) {
    throw new Error(`Error al intentar imprimir etiqueta: ${error}`);
  }
}

export async function PrintLabelBluetooth(label: string, macAddress: string) {
  try {
    console.log("ejecutando funcion para imprimir etiqueta");
    const result = await ThermalPrinterModule.printBluetooth({ payload: label, macAddress: macAddress });
    console.log("resultado de la impresion: ", result);
  } catch (error) {
    throw new Error(`Error al intentar imprimir etiqueta: ${error}`);
  }
}
