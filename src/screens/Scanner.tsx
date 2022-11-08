import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useRecoilState } from "recoil";
import { SCANNED_DATA } from "../state";

// DEPRECATED

function Scanner({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [testText, setTestText] = useState("Qr read");
  const [scannedDat, setScannedData] = useRecoilState(SCANNED_DATA);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setTestText(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setScannedData(data);
  };

  return (
    <View style={styles.container}>
      {scanned ? (
        <View>
          <IconButton
            icon="reload"
            size={70}
            onPress={() => {
              setScanned(false);
            }}
          />
        </View>
      ) : (
        // <BarCodeScanner
        //   style={StyleSheet.absoluteFillObject}
        //   onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // />
        <Camera
          style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ></Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Scanner;
