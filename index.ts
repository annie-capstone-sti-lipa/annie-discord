import "dotenv/config";
import DiscordHelper from "./discord-helper";

export const discordHelper = new DiscordHelper(process.env.DISCORD_TOKEN!);
