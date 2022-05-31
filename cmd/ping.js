

const Discord = require("discord.js");
module.exports = {
  name: "ping",
  description: "サーバーとの接続時間を調べる",
  run: (message,args,client) => {
    message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
      .setTitle("Pong!")
      .setDescription(
        `🏓 Pong!\nLatency is ${Math.floor(
          msg.createdTimestamp - message.createdTimestamp
        )}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`
      )
      .setColor("RANDOM");
      msg.edit({embeds:[_]});
      msg.edit("\u200B");
    });
  }
}