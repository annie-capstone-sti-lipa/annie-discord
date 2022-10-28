import { Client, GatewayIntentBits, Partials, DMChannel } from "discord.js";

class DiscordHelper {
  client = new Client({
    intents: [
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.Guilds,
    ],
    partials: [Partials.Message, Partials.Channel],
  });

  constructor(token: string) {
    this.client.on("ready", async () => {
      console.log(`Logged in as ${this.client.user!.tag}!`);
    });

    this.client.on("messageCreate", (message) => {
      if (this.client.user?.id !== message.author.id) {
        let isDM = message.channel instanceof DMChannel;

        if (isDM) {
          message.author.send("heloo");
        } else {
          message.channel.send("heloo from channel");
        }
      }
    });

    this.client.login(token);
  }
}

export default DiscordHelper;
