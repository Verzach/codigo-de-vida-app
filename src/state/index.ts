import { atom } from "recoil";
import { UserData } from "../types/userData";
export const SCANNED_DATA = atom({
  key: "scannedData",
  default: "",
});

export const isLoggedIn = atom<boolean | undefined>({
  key: "isLoggedIn",
  default: undefined,
});

export const MAIN_SERVER = "20.118.130.63"
export const SERVER_URL = `http://${MAIN_SERVER}:80`;
export const SERVER = atom({
  key: "SERVER",
  default: SERVER_URL,
});

export const AUTH_TOKEN = atom({
  key: "AUTH_TOKEN",
  default: "",
});

export const DETAILS_SCREEN_EFFECT = atom<boolean | undefined>({
  key: "DETECT_SCREEN_EFFECT",
  default: undefined,
});

export const DETAILS_DATA = atom<UserData>({
  key: "detailsData",
  default: {
    id: "",
    nombres: "",
    apellidos: "",
    edad: "",
    cedula: "",
    telefono: "",
    direccion: "",
    sangre: "",
    historia: "",
    nombres_acudiente: "",
    apellidos_acudiente: "",
    telefono_acudiente: "",
    cedula_acudiente: "",
    direccion_acudiente: "",
  },
});
