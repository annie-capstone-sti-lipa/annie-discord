import {
  Client,
  GatewayIntentBits,
  Partials,
  DMChannel,
  Message,
} from "discord.js";
import { fireBaseHelper } from ".";

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

  sendReply(message: Message, reply: string) {
    let isDM = message.channel instanceof DMChannel;
    if (isDM) {
      message.author.send(reply);
    } else {
      message.channel.send(reply);
    }
  }

  saveDiscordId(message: Message) {
    let userId = message.content.split(" ")[1];
    fireBaseHelper
      .saveUserDiscordId(message.author.id, userId)
      .then((response) => {
        if (response.success) {
          this.sendReply(message, response.message);
        } else {
          this.sendReply(
            message,
            "Sorry but I don't recognize that command. Please make sure to copy and paste the exact command provided by https://client-annie.me"
          );
        }
      });
  }

  constructor(token: string) {
    this.client.on("ready", async () => {
      console.log(this.client.user?.id);
      console.log(`Logged in as ${this.client.user!.tag}!`);
    });

    this.client.on("messageCreate", (message) => {
      if (this.client.user?.id !== message.author.id) {
        if (message.content.includes(".register")) {
          this.saveDiscordId(message);
        } else {
          this.sendReply(message, "hello");
        }
      }
    });

    this.client.login(token);
  }
}

export default DiscordHelper;
