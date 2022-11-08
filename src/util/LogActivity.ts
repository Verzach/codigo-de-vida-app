import { SERVER_URL } from "../state";
import { createClient } from "./PocketbaseUtil";

export async function logAccess(id: string, cedula:string, from: string) {
  const client = await createClient(SERVER_URL);
  client.records.create("registros", {
  "email_usuario": client.authStore.model?.email,
  "cedula_paciente": cedula,
  "desde": from,
  "cliente": "app"
  })
}