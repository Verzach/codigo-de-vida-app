import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { StyleSheet } from "react-native";
import { Button, DefaultTheme, Provider } from "react-native-paper";
import Login from "./src/screens/Login";
import StartScreen from "./src/screens/StartScreen";
import { isLoggedIn, SERVER_URL } from "./src/state";
import { Connect } from "./Connect";
import { logOut } from "./src/util/PocketbaseUtil";
import SearchScreen from "./src/screens/SearchScreen";
import { makePDF } from "./src/util/PDFExport";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Recents from "./src/screens/Recents";
import ScanScreen from "./src/screens/ScanScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function App() {
  return (
    <>
      <Provider theme={DefaultTheme}>
        <RecoilRoot>
          <MainScreen />
        </RecoilRoot>
      </Provider>
      <ExpoStatusBar style="auto" translucent={false} />
    </>
  );
}

// const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
function MainScreen() {
  const [isLogged, setIsLogged] = useRecoilState(isLoggedIn);
  if (isLogged === undefined) {
    return <Connect />;
  }
  if (!isLogged && isLogged !== undefined) {
    return <Login />;
  } else if (isLogged)
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName={"Scanner"} barStyle={{backgroundColor: "black"}}>
          <Tab.Screen
            name="Recientes"
            component={Recents}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialIcons color={color} name="recent-actors" size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Scanner"
            component={ScanScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  color={color}
                  name="qrcode-scan"
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Buscar"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialIcons color={color} name="search" size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="Ajustes"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialIcons color={color} name="settings" size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );

  return null;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
