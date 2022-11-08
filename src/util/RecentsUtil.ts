import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types/userData";

export async function getRecentPatients(): Promise<UserData[]
> {
  const recents = await AsyncStorage.getItem("@recent-patients");
  if (recents === null) {
    return [];
  } else {
    return JSON.parse(recents);
  }
}

export async function setRecentPatients(
  recents: UserData []
) {
  await AsyncStorage.setItem("@recent-patients", JSON.stringify(recents));
}

export async function addOnePatientToRecents(patient: UserData) {
  let isDuplicate = false;
  const currentPatients = await getRecentPatients();
  currentPatients.map((currentPatient) => {
    if (currentPatient.id === patient.id) {
      isDuplicate = true;
    }
  });
  if (isDuplicate) return;
  currentPatients.push(patient);
  await AsyncStorage.setItem(
    "@recent-patients",
    JSON.stringify(currentPatients)
  );
}

export async function removeOnePatientFromRecents(id: string) {
  const currentPatients = await getRecentPatients();
  const filteredPatients = currentPatients.filter(
    (currentPatient) => currentPatient.id !== id
  );
  await AsyncStorage.setItem(
    "@recent-patients",
    JSON.stringify(filteredPatients)
  );
}
