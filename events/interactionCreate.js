const { Collection, EmbedBuilder } = require("discord.js");
const wixua = require("croxydb");
const { readdirSync } = require("fs");
module.exports = async(client, interaction) => {

  const { user, customId, guild } = interaction;

  if(interaction.isChatInputCommand()) {
    if (!interaction.guildId) return;
    readdirSync('./commands').forEach(f => {
      const cmd = require(`../commands/${f}`);
      if(interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) 

const embed = new EmbedBuilder()
.setTitle(`❓ Hey, Noluyor`)
.setColor("Green")
.setDescription(`**${wixua.get("karaliste.sebep")}** nedeniyle karalisteye alındın.`)
.setFooter({text: "😔 ALLAH KURTARSIN"})
.setImage("https://cdn.discordapp.com/attachments/1077609627132370984/1080745644135825468/allah-kurtarsn-deep-turkish-web.gif")

        if (interaction.member.id === wixua.fetch(`karaliste.user`)) return interaction.reply({embeds: [embed], ephemeral: true})

        return cmd.run(client, interaction, wixua);
      }
});
}
};
