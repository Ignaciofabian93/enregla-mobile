import ThermalPrinterModule from "react-native-thermal-printer";

export async function GetBluetoothDevices() {
  const devices = await ThermalPrinterModule.getBluetoothDeviceList();
  return devices;
}

export async function PrintLabelBluetooth(label: string, macAddress: string) {
  try {
    console.log("ejecutando funcion para imprimir etiqueta");
    const result = await ThermalPrinterModule.printBluetooth({
      payload: label,
      macAddress: macAddress,
      autoCut: true,
    });
    console.log("resultado de la impresion: ", result);
  } catch (error) {
    throw new Error(`Error al intentar imprimir etiqueta: ${error}`);
  }
}
