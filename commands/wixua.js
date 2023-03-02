const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const wixua = require("croxydb");
module.exports = {
  name: "yardım",
  description: "Yardım menüsü!",
  type: 1,
  options: [],

  run: async (client, interaction) => {


    const embed = new EmbedBuilder()
    .setDescription("**Kanka tebrikler kara listeded değilsin**")

    interaction.reply({embeds: [embed]})
  }
}