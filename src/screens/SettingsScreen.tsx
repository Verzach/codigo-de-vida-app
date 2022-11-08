import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { logOut } from "../util/PocketbaseUtil";
import { isLoggedIn, SERVER_URL } from "../state";
import { useSetRecoilState } from "recoil";

const SettingsScreen = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);
  return (
    <View style={{ justifyContent: "flex-end", height: "100%" }}>
      <Button
        color="black"
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        mode="contained"
        onPress={() => logOut(SERVER_URL, setIsLoggedIn)}
        icon="logout"
      >
        Cerrar Sesion
      </Button>
    </View>
  );
};

export default SettingsScreen;
