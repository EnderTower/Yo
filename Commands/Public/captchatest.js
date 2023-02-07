const { Captcha } = require("captcha-canvas");
const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const captcha = new Captcha();

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("captchatest")
        .setDescription("Test captcha system"),

    
    async execute(interaction, client) {
        captcha.async = true;
        captcha.addDecoy();
        captcha.drawTrace();
        captcha.drawCaptcha();

        const captchaImage = new AttachmentBuilder(await captcha.png, {name: "captcha.png"});

        await interaction.reply({ content: "captchaTest", files: [captchaImage]})

        await interaction.channel.awaitMessages({
            filter: m => m.author.id == interaction.user.id,
            max: 1,
            time: 1000*60,
            errors: ["time"]
        }).then(async (value) => {
            let isValid = value.first().content == captcha.text;
            if(isValid) interaction.followUp({content: "gg"})
            else interaction.followUp({content: "not gg"})
        }).catch(err => {
                interaction.followUp({content: "time's up !"})
        })
    }
    
}