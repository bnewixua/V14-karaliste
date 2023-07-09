const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const wixua = require("croxydb")
const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 32
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const { Modal } = require("discord-modals");
const { isMapIterator } = require("util/types");
const karaliste = require("./commands/karaliste");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`[ + ] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[ + ] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

client.on('interactionCreate', async (interaction) => {

  if (!interaction.guild) return;
  
  const { user, customId, guild } = interaction;

  if(interaction.isButton()) {
    if(interaction.customId === `reddet_${user.id}`) {

      interaction.update({ content: `<@${wixua.get(`karaliste`).user}> Kullanıcı kara listeye ekleyemedim`, embeds: [], components: [] })

    }
    

    if(interaction.customId === `onayla_${user.id}`) {
      interaction.update({ content: `**<@${wixua.get(`karaliste`).user}> Adlı kullanıcıyı şu sebepten __${wixua.get(`karaliste`).sebep}__ kara listeye aldım.**`, embeds: [], components: []});
      
      
    }
  }
  
  if(interaction.isButton()) {
    if (!interaction.guild) return;

    const { user, customId, guild } = interaction;

    if(interaction.customId === `reddett_${user.id}`) {
      return interaction.update({ content: `<@${wixua.get(`karaliste`).user}> Kullanıcıyı beyaz listeden çıkaramadım`, embeds: [], components: [] })
    }
    

    if(interaction.customId === `onay_${user.id}`) {
      interaction.update({ content: `<@${wixua.get(`karaliste`).user}> Kullanıcı başarıyla kara listeden çıkardım`, embeds: [], components: []});

      wixua.delete(`karaliste`)
      
      
    }
  }


})
