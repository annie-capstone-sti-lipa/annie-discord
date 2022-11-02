import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default class FireBaseHelper {
  firestore = getFirestore();
  storage = getStorage();

  userDiscordIdCollection = "users-discord";

  public async saveUserDiscordId(
    discordId: string,
    userId: string
  ): Promise<any> {
    return await setDoc(
      doc(this.firestore, this.userDiscordIdCollection, userId),
      { discordId: discordId }
    )
      .then(() => ({
        success: true,
        message: "Discord Id saved!",
      }))
      .catch((e) => ({ success: false, message: e.toString() }));
  }
}
