const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const wixua = require("croxydb");
module.exports = {
  name: "karalise",
  description: "Kara listeye alırsınız!",
  type: 1,
  options: [

    {
      name: "kullanıcı",
      description: "Kara listeye alınacak kullanıcı",
      type: 6,
      required: true
      },
      {
        name: "sebep",
        description: "Kara listeye alınacak kullanıcı",
        type: 3,
        required: true
        }

  ],
  run: async (client, interaction) => {

    const kullanıcı = interaction.options.getMember('kullanıcı')
    const sebep = interaction.options.getString('sebep')

    if(wixua.fetch(`karaliste`, { user: kullanıcı.id, yt: interaction.user.id, sebep: sebep })) {

      return interaction.reply({content: "Belirttiğiniz kullanıcı zaten kara listede", ephemeral: true })
    }

    await interaction.deferReply();
    const { user, options, guild } = interaction;

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, false)) {
      return interaction.followUp({ content: "✅ **|** Bu komutu kullanmak için gerekli izinleri karşılayamıyorsun.", ephemeral: true })
    }


    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`onayla_${user.id}`)
        .setLabel('✅ Onaylıyorum')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId(`reddet_${user.id}`)
        .setLabel('❌ Onaylamıyorum')
        .setStyle(ButtonStyle.Secondary),
    );


    const embed = new EmbedBuilder()
    .setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
    .setTitle(`❓Bir dakika, Emin misin?`)
    .setDescription(`**${kullanıcı} Adlı kullanıcıyı** __${sebep}__ ** sebepten kara listeye almak istiyormusun?**`)
    .setFooter({text: "Wixua Tester"})

    wixua.set(`karaliste`, { user: kullanıcı.id, yt: interaction.user.id, sebep: sebep })
   // wixua.push(`karaliste`, { user: kullanıcı.id, yt: interaction.user.id, sebep: sebep })

    interaction.followUp({embeds: [embed], components: [row]})


  }
}