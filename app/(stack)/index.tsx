import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

const App = () => {
  const [vin, setVin] = useState("");

  const handlePrint = async () => {
    try {
      // const printer = await connectPrinter();
      // await printText(printer, vin);
      // await disconnectPrinter(printer);
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter VIN"
        value={vin}
        onChangeText={setVin}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Print VIN" onPress={handlePrint} />
    </View>
  );
};

export default App;
