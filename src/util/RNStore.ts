import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseAuthStore, User, Admin } from "./pck/pocketbase.es.js";


/**
 * The default token store for browsers with auto fallback
 * to runtime/memory if local storage is undefined (eg. in node env).
 */
export default class RNStore extends BaseAuthStore {
  private storageFallback: { [key: string]: any } = {};
  private storageKey: string;

  constructor(storageKey = "pocketbase_auth") {
    super();

    this.storageKey = storageKey;
  }

  async restore(): Promise<void> {
    const data = await AsyncStorage.getItem(this.storageKey);
    const parsedData = JSON.parse(data || "{}");
    this.storageFallback[this.storageKey] = parsedData;
    console.log("🚀 ~ RNStore ~ restore ~ storageFallback", this.storageFallback)
  }

  /**
   * @inheritdoc
   */
  get token(): string {
    const data = this._storageGet(this.storageKey) || {};

    return data.token || "";
  }

  /**
   * @inheritdoc
   */
  get model(): User | Admin | null {
    let data = this._storageGet(this.storageKey);
    if (data === undefined) {
      data = {}
    }

    if (
      data === null ||
      typeof data !== "object" ||
      data.model === null ||
      typeof data.model !== "object"
    ) {
      return null;
    }

    // admins don't have `verified` prop
    if (typeof data.model?.verified !== "undefined") {
      return new User(data.model);
    }

    return new Admin(data.model);
  }

  /**
   * @inheritdoc
   */
  save(token: string, model: User | Admin | null) {
    this._storageSet(this.storageKey, {
      token: token,
      model: model,
    });

    super.save(token, model);
  }

  /**
   * @inheritdoc
   */
  clear() {
    this._storageRemove(this.storageKey);
    super.clear();
  }

  // ---------------------------------------------------------------
  // Internal helpers:
  // ---------------------------------------------------------------

  /**
   * Retrieves `key` from the browser's local storage
   * (or runtime/memory if local storage is undefined).
   */
  private _storageGet(key: string): any {
    // fallback
    return this.storageFallback[key];
  }

  /**
   * Stores a new data in the browser's local storage
   * (or runtime/memory if local storage is undefined).
   */
  private _storageSet(key: string, value: any) {
    // store in fallback
    AsyncStorage.setItem(key, JSON.stringify(value));
    this.storageFallback[key] = value;
  }

  /**
   * Removes `key` from the browser's local storage and the runtime/memory.
   */
  private _storageRemove(key: string) {
    // delete from fallback
    AsyncStorage.removeItem(key);
    delete this.storageFallback[key];
  }
}
