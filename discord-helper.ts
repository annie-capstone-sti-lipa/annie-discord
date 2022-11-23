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
    let userId = message.content.split(" ")[1] ?? "none";

    if (userId === "none") {
      this.sendReply(
        message,
        "Sorry but I don't recognize that registration code. Please make sure to copy and paste the exact command provided by https://client-annie.me"
      );
    } else {
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
  }

  constructor(token: string) {
    this.client.on("ready", async () => {
      console.log(`Logged in as ${this.client.user!.tag}!`);
    });

    this.client.on("messageCreate", (message) => {
      let isDM = message.channel instanceof DMChannel;

      if (isDM) {
        if (this.client.user?.id !== message.author.id) {
          if (message.content.includes(".register")) {
            this.saveDiscordId(message);
          }
        }
      } else {
        if (message.content.includes(".register")) {
          message.reply("I've sent you a DM.");
          message.author.send(
            "Hello, please send your registration command you got from https://client-annie.me here."
          );
        }
      }
    });

    this.client.login(token);
  }
}

export default DiscordHelper;
