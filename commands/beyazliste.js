const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const wixua = require("croxydb");
module.exports = {
  name: "beyazliste",
  description: "Kara listede çıkarırsınız!",
  type: 1,
  options: [

    {
      name: "kullanıcı",
      description: "Kara listeye alınacak kullanıcı",
      type: 6,
      required: true
      }

  ],
  run: async (client, interaction) => {

    const kullanıcı = interaction.options.getMember('kullanıcı')
    let sebep = interaction.options.getString('sebep')
    
    /*if(wixua.fetch(`karaliste`, { user: kullanıcı.id, yt: interaction.user.id, sebep: sebep })) {

      return interaction.reply({content: "Böyle bir kullanıcı kara listede bulunmuyor", ephemeral: true })
    }*/

    await interaction.deferReply();
    const { user, options, guild } = interaction;

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, false)) {
      return interaction.followUp({ content: "✅ **|** Bu komutu kullanmak için gerekli izinleri karşılayamıyorsun.", ephemeral: true })
    }


    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`onay_${user.id}`)
        .setLabel('✅ Onaylıyorum')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId(`reddett_${user.id}`)
        .setLabel('❌ Onaylamıyorum')
        .setStyle(ButtonStyle.Secondary),
    );


    const embed = new EmbedBuilder()
    .setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
    .setTitle(`❓Bir dakika, Emin misin?`)
    .setDescription(`**${kullanıcı} Adlı kullanıcıyı kara listeden çıkarmak istiyormusun?**`)
    .setFooter({text: "Wixua Tester"})

    interaction.followUp({embeds: [embed], components: [row]})


  }
}
