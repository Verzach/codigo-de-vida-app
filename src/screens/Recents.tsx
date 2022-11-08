import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { PatientComp } from "./PatientComp";
import { nanoid } from "nanoid";
import { useState } from "react";
import { getRecentPatients } from "../util/RecentsUtil";
import { UserData } from "../types/userData";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DETAILS_DATA, DETAILS_SCREEN_EFFECT, SERVER, SERVER_URL} from "../state";
import { useIsFocused } from "@react-navigation/native";
import { createClient } from "../util/PocketbaseUtil";
import { logAccess } from "../util/LogActivity";

const Recents = () => {
  const url = useRecoilState(SERVER);
  const [recentPatients, setRecentPatients] = useState<UserData[]>([]);
  const setDetailsData = useSetRecoilState(DETAILS_DATA);
  const setDetailsScreenEffect = useSetRecoilState(DETAILS_SCREEN_EFFECT);
  const isFocused = useIsFocused()
  const [forceRefresh, setForceRefresh] = useState(false);
  useEffect(() => {
    console.log("refresh");
    getRecentPatients().then((recentPatients) => {
      setRecentPatients(recentPatients);
    });
  }, [isFocused, forceRefresh]);
  const selectPatient = async (data: UserData) => {
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
    const client = createClient(SERVER_URL).then((client) => {
     
    }).catch(console.log);
    setDetailsScreenEffect((val) => !val);

  };
  return (
    // <View style={{ justifyContent: "center", alignContent: "center" }}>
    <ScrollView style={{ marginTop: 20,  marginBottom: "15%" }}>
      {recentPatients.map((patient) => (
        <PatientComp
          key={nanoid()}
          id={patient.id}
          name={`${patient.nombres} ${patient.apellidos}`}
          document={patient.cedula}
          photo={""}
          record={null as any}
          style={{ marginVertical: 5, alignSelf: "center", width: "90%" }}
          onPress={() => {selectPatient(patient); logAccess(patient.id, patient.cedula, "Recientes")}}
          isRecents
          refreshSetter={setForceRefresh}
        />
      ))}
      {recentPatients.length != 0 ? null : (
        <Text
          style={{ alignSelf: "center", marginVertical: "90%", fontSize: 15 }}
        >
          No hay pacientes recientes
        </Text>
      )}
    </ScrollView>
    // </View>
  );
};

export default Recents;
