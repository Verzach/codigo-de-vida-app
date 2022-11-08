import Pocketbase from "pocketbase/dist/pocketbase.cjs";
import RNStore from "./RNStore";

export async function getUserId(client?: Pocketbase, url?: string): Promise<string | undefined> {
  // const store = new CustomAuthStore("pocket-auth");
  const store = new RNStore();
  await store.restore();
  if (client === undefined || client === null){
    client = new Pocketbase(url, "en-US", store as any);
  }
  console.log("ID:", store.model)
  return store.model?.id;
}
