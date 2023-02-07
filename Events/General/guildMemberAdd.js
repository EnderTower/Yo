const { Captcha } = require("captcha-canvas");
const { EmbedBuilder } = require("discord.js");
const messageCreate = require("../Reaction/messageCreate");
const captcha = new Captcha();

module.exports = {
    name: "guildMemberAdd",

    async execute(member, client) {
        const { guild } = member;
        captcha.async = true;
        captcha.addDecoy();
        captcha.drawTrace();
        captcha.drawCaptcha();

        const captchaImage = new AttachmentBuilder(await captcha.png, {name: "captcha.png"});

        await interaction.reply({ content: `<@${member.user.id}>`, files: [captchaImage]})

        await interaction.channel.awaitMessages({
            filter: m => m.author.id == interaction.user.id,
            max: 1,
            time: (1000*60)*5, //Replace 5 with the time in minutes you want for Pixy's verification system.
            errors: ["time"]
        }).then(async (value) => {
            let isValid = value.first().content == captcha.text;
            if(isValid) {
                if(member.roles.cache.has(client.config.verificationRole)) {
                    const alreadyVerifiedEmbed = new EmbedBuilder()
                        .setColor(client.config.embedcolor)
                        .setDescription(`${client.config.noEmoji} Vous êtes déjà vérifié.`)
                    message.channel.send({ embeds: [] })
                }
            }
            else interaction.followUp({content: "not gg"})
        }).catch(err => {
            member.kick(`Système de vérification - Le membre ${member.user.tag} ne s'est pas vérifié dans le temps imparti (5mn).`)
        })
    }
}