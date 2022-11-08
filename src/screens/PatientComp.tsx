import React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { makePDF } from "../util/PDFExport";
import { Record } from "pocketbase";
import { MAIN_SERVER } from "../state";
import { openBrowserAsync } from "expo-web-browser";
import { removeOnePatientFromRecents } from "../util/RecentsUtil";

export function PatientComp(props: {
  id: string;
  name: string;
  document: string;
  photo: string;
  record: Record;
  style: any;
  onPress: () => void;
  isRecents?: boolean;
  refreshSetter?: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const link = props.photo;
  const record = props.record;
  return (
    <Card style={props.style} onPress={props.onPress}>
      <Card.Title
        title={props.name}
        subtitle={props.document}
        left={(props) =>
          link === "" ? (
            <Avatar.Icon
              icon={"account"}
              size={50}
              style={{ backgroundColor: "#0033cc" }}
            />
          ) : (
            <Avatar.Image source={{ uri: link }} size={50} />
          )
        }
      />
      <Card.Actions>
        <Button
          color="black"
          icon={"download"}
          onPress={() => {
            openBrowserAsync(
              `http://${MAIN_SERVER}:3000/generatepdf/${props.id}`
            );
          }}
        >
          Exportar
        </Button>
        {props.isRecents ? (
          <Button
            color="red"
            icon={"delete"}
            onPress={() => {
              removeOnePatientFromRecents(props.id);
              if (props.refreshSetter === undefined) return;
              props.refreshSetter((val) => !val);
            }}
          >
            Eliminar
          </Button>
        ) : null}
      </Card.Actions>
    </Card>
  );
}
