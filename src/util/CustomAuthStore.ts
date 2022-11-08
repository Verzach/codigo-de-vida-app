/*This custom authStore is maded because Pocketbase uses LocalStorage by
 * deafult and is not present on ReactNative, so is needed to use the AsyncStorage instead.
 * This is from the Pocketbase repository: https://github.com/pocketbase/js-sdk
*/
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Pocketbase from "pocketbase";
// import { User, Admin } from "pocketbase";
// import JWT from "./JWT";

// export class CustomAuthStore {
//   token: string = "";
//   private storagekey: string;
//   model: User | Admin | {} = {};

//   constructor(storagekey: string) {
//     this.storagekey = storagekey;
//   }

//   async restore(): Promise<void> {
//     try {
//       await AsyncStorage.getItem(this.storagekey).then((data) => {
//         const parsedData = JSON.parse(data || "{}");
//         if (parsedData.token === undefined) return;
//         this.token = parsedData.token;
//         this.model = parsedData.model;
//       });
//     } catch (error) {}
//   }

//   save(token: string, model: Pocketbase.User | Pocketbase.Admin | {}) {
//     AsyncStorage.setItem(
//       this.storagekey,
//       JSON.stringify({
//         token: token,
//         model: model,
//       })
//     ).then(() => {
//       console.log(`Saved token: ${token}`);
//     });
//   }

//   clear(): void {
//     AsyncStorage.clear().then(() => {
//       console.log("Cleared token storage");
//     });
//   }

//   get isValid(): boolean {
//     return !JWT.isExpired(this.token);
//   }
// }
// export type AuthStore = {
//   /**
//    * Retrieves the stored token (if any).
//    */
//   readonly token: string;

//   /**
//    * Retrieves the stored model data (if any).
//    */
//   readonly model: Pocketbase.User | Pocketbase.Admin | {};

//   /**
//    * Checks if the store has valid (aka. existing and unexpired) token.
//    */
//   readonly isValid: boolean;

//   /**
//    * Saves new token and model data in the auth store.
//    */
//   save(token: string, model: Pocketbase.User | Pocketbase.Admin | {}): void;

//   /**
//    * Removes the stored token and model data form the auth store.
//    */
//   clear(): void;
// };
