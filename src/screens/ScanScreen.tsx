import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";
import { DETAILS_DATA, DETAILS_SCREEN_EFFECT, SERVER_URL } from "../state";
import { UserData } from "../types/userData";
import { logAccess } from "../util/LogActivity";
import { createClient } from "../util/PocketbaseUtil";
import { Details } from "./Details";
const Stack = createStackNavigator();

export default function ScanScreen() {
  return (
    <Stack.Navigator initialRouteName="Scan">
      <Stack.Screen
        name="Scan"
        component={Scanner}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detalles" component={Details} />
    </Stack.Navigator>
  );
}

function Scanner({ navigation }: any) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [detailsData, setDetailsData] = useRecoilState(DETAILS_DATA);
  const [scanData, setScannedData] = useState("");
  const doDetailsEffect = useRecoilValue(DETAILS_SCREEN_EFFECT);
  useEffect(() => {
    //This prevents the details screen from being shown when the app is first opened
    if (doDetailsEffect === undefined) return;
    navigation.navigate("Detalles");
    console.log("Details effect triggered");
    return () => {};
  }, [doDetailsEffect]);
  let currentDetailsId = "";
  let currentScannedData = "";

  const isFocused = useIsFocused();
  const searchPatient = async (document?: string) => {
    const client = await createClient(SERVER_URL);
    const data = await client.records
      .getOne("pacientes", document === undefined ? scanData : document)
      .catch(() => undefined);
    console.log(data);
    return data;
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Tienes que dar permiso para la camara.
        </Text>
        <Button onPress={requestPermission}>Dar Permiso</Button>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          style={styles.camera}
          type={type}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={async (result) => {
            if (currentScannedData === result.data) return;
            console.log(result);
            setScannedData(result.data);
            currentScannedData = result.data;
            const data: UserData | undefined = (await searchPatient(
              result.data
            )) as UserData | undefined;
            console.log(data);
            if (data === undefined) {
              alert("Error");
              console.log("sdsdsd");
              return;
            } else {
              setDetailsData({
                nombres: data.nombres,
                apellidos: data.apellidos,
                cedula: data.cedula,
                direccion: data.direccion,
                sangre: data.sangre,
                edad: data.edad,
                telefono: data.telefono,
                nombres_acudiente: data.nombres_acudiente,
                apellidos_acudiente: data.apellidos_acudiente,
                telefono_acudiente: data.telefono_acudiente,
                direccion_acudiente: data.direccion_acudiente,
                cedula_acudiente: data.cedula_acudiente,
                historia: data.historia,
                id: data.id,
              });
              // Prevent duplicate logs
              if (data.id !== currentDetailsId) {
                console.log(
                  "Logging access",
                  data.id,
                  detailsData.id,
                  data.id !== detailsData.id
                );
                logAccess(data.id, data.cedula, "Scanner");
              }
              currentDetailsId = data.id;
              navigation.navigate("Detalles");
            }
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Detalles")}
            >
              <Text style={styles.text}>Ir a detalles</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
