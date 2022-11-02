import "dotenv/config";
import DiscordHelper from "./discord-helper";
import { initializeApp } from "firebase/app";
import FireBaseHelper from "./firebase-helpers";

initializeApp(require("./config.json"));

export const fireBaseHelper = new FireBaseHelper();
export const discordHelper = new DiscordHelper(process.env.DISCORD_TOKEN!);
