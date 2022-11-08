import "react-native-get-random-values";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Avatar, List, Paragraph, TextInput, Title } from "react-native-paper";
import { createClient } from "../util/PocketbaseUtil";
import { DETAILS_DATA, DETAILS_SCREEN_EFFECT, SCANNED_DATA, SERVER_URL } from "../state";
import { nanoid } from "nanoid";
import { Record, User } from "pocketbase";
import { PatientComp } from "./PatientComp";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserData } from "../types/userData";
import { logAccess } from "../util/LogActivity";

function SearchScreen() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Record[] | undefined>(undefined);
  const setDetailsData = useSetRecoilState(DETAILS_DATA);
  const setDetailsScreenEffect = useSetRecoilState(DETAILS_SCREEN_EFFECT)
  const [scannedData, setScannedData] = useRecoilState(SCANNED_DATA);
  const LeftContent = (props: any) => (
    <Avatar.Icon {...props} icon="account-outline" />
  );
  const searchPatient = async () => {
    const client = await createClient(SERVER_URL);

    const data = await client.records.getList(
      "pacientes",
      undefined,
      undefined,
      {
        filter: `cedula ~ ${query}`,
      }
    );
    data.items.map((item) => {
      console.log(client.records.getFileUrl(item, item.foto));
    });
    console.log(data);
    const patients = data.items;
    setResults(patients);
    return data;
  };

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
    setDetailsScreenEffect((val) => !val)
  };
  return (
    <View style={styles.container}>
      <TextInput
        activeOutlineColor="black"
        style={styles.textInput}
        placeholder={"Numero de cedula"}
        mode={"outlined"}
        right={
          <TextInput.Icon
            name="file-search-outline"
            onPress={() => searchPatient()}
          />
        }
        label={"Cedula"}
        value={query}
        onEndEditing={() => console.log("hi")}
        onChangeText={(text) => setQuery(text)}
      />

      <ScrollView style={{ width: "90%", marginBottom: "15%" }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {results?.map((result) => (
          <PatientComp
            key={nanoid()}
            id={result.id}
            name={`${result.nombres} ${result.apellidos}`}
            document={result.cedula}
            photo={result.foto}
            record={result}
            style={{ marginVertical: 5 }}
            onPress={() => {selectPatient((result as unknown) as UserData); logAccess(result.id, result.cedula, "Busqueda")}}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
  },
});

export default SearchScreen;
