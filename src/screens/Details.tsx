import { openBrowserAsync } from "expo-web-browser";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { Avatar, DataTable, Button } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { DETAILS_DATA, MAIN_SERVER } from "../state";
import { addOnePatientToRecents } from "../util/RecentsUtil";

export const Details = () => {
  const data = useRecoilValue(DETAILS_DATA);
  console.log(data);
  useEffect(() => {
    if (data.id === "")
      return;
    addOnePatientToRecents(data);
  }, [data]);
  return (
    <ScrollView>
      <Avatar.Icon
        style={{ alignSelf: "center", marginVertical: 18, backgroundColor: "#0033cc" }}
        size={150}
        icon="account-circle" />
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 25 }}>
            Paciente
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Nombre
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.nombres}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Apellidos
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.apellidos}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Edad
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.edad}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Cedula
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.cedula}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Direccion
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.direccion}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Tipo de Sangre
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.sangre}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Historia Clinica
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.historia}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <DataTable style={{ marginVertical: 5 }}>
        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 25 }}>
            Acudiente
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Nombre
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.nombres_acudiente}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Apellido
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.apellidos_acudiente}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Telefono
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.telefono_acudiente}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Direccion
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.direccion_acudiente}</DataTable.Cell>
        </DataTable.Row>

      </DataTable>
      <Button
        icon="download"
        style={{ marginVertical: 5, marginHorizontal: 10 }}
        mode="contained"
        color="black"
        onPress={() => data.id != "" ? openBrowserAsync(`http://${MAIN_SERVER}:3000/generatepdf/${data.id}`) : () => { }}
      >
        Exportar
      </Button>
    </ScrollView>
  );
};
