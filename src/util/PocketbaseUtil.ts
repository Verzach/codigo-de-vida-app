import pocketbase from "./pck/pocketbase.es.js";
import RNStore from "./RNStore";
export async function createClient(
  url: string
): Promise<pocketbase> {
  const store = new RNStore();
  await store.restore();
  console.log("🚀 ~ file: Pocketbase.ts ~ store", store.model)
  return new pocketbase(url, "en-US", store as any);
}

export async function logOut(url: string, setter: (valOrUpdater: boolean | ((currVal: boolean | undefined) => boolean | undefined) | undefined) => void) {
    const client = await createClient(url);
    client.authStore.clear();
    setter(undefined);
  }
