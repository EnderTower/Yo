const { 
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    DiscordAPIError,
    ChannelType,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Allows you to send a Discord embed.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(options => options 
        .setName("text")
        .setDescription("Use '§' to skip a line.")
        .setRequired(false)
    )
    .addChannelOption(options => options
        .setName("channel")
        .setDescription("Specify the channel name.")
        .setRequired(false)
    )
    .addStringOption(options => options 
        .setName("titre")
        .setDescription("Spécifiez le titre du message.")
        .setRequired(false)
    )
    .addStringOption(options => options 
        .setName("image")
        .setDescription("Spécifiez l'image présente dans l'embed.")
        .setRequired(false)
    )
    .addStringOption(options => options
        .setName("footertext")
        .setDescription("Spécifiez un nom pour le footer.")
        .setRequired(false)
    )
    .addStringOption(options => options
        .setName("footerimage")
        .setDescription("Spécifiez un lien d'image pour le footer.")
        .setRequired(false)
    )
    .addBooleanOption(options => options
        .setName("disablecolor")
        .setDescription("Désactivez la couleur (True)")
        .setRequired(false)
    )
    .addStringOption(options => options
        .setName("embedcolor")
        .setDescription("Spécifiez une couleur au format hexadécimal.")
        .setRequired(false)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { options, guild, member } = interaction

        //Options
        const rawmessage = options.getString("texte") || null;
        const channel = options.getChannel("channel") || interaction.channel;
        if(channel.type != ChannelType.GuildText) {
            return interaction.reply({embeds: [new EmbedBuilder().setColor('Red').setDescription(client.config.noEmoji + " The channel you specified isn't a text channel.")]})
        }
        const title = options.getString("titre");
        const footertext = options.getString("footertext");
        const rawfooterimage = options.getString("footerimage")
        const rawimage = options.getString("image") || null;
        const rawembedcolor = options.getString("embedcolor")
        const interactionAuthor = await interaction.guild.members.fetch(interaction.user.id);
        var message
        if (rawmessage != null) {
            message = rawmessage.replaceAll('§', '\n');
        } else {
            message = null;
        }
        const disableColor = options.getBoolean("disablecolor") || null;
        
        //Variables
        var hexatest = /^#([0-9a-f]{3}){1,2}$/i;
        var isfooterinvalid = false
        var isimageinvalid = false
        var embedcolorunfiltered
        var embedcolor
        var footerimage
        var image

        if(rawembedcolor != null && !rawembedcolor.startsWith('#')) {
            return interaction.reply({embeds: [new EmbedBuilder().setColor('Red').setDescription(client.config.noEmoji + " This color is invalid. Please use HEX colors only, for example: `#FFFFFF`")]})
        }

        function isImage(url) {
            return /\.(jpg|jpeg|png|webp|svg)$/.test(url);
        }

        //Checks #1
        if(isImage(rawfooterimage) == true) {
            footerimage = rawfooterimage;
        } else {
            footerimage = client.config.defaultFooterImage;
            if (rawfooterimage != null) {
                interaction.reply({embeds: [new EmbedBuilder().setColor(client.config.embedcolor).setDescription(`${client.config.noEmoji} The 'footerimage' link you provided isn't valid.`)]})
                isfooterinvalid = true;
            }
        }

        if(isImage(rawimage) == true) {
            image = rawimage;
        } else {
            if(rawimage != null) {
                interaction.reply({embeds: [new EmbedBuilder().setColor(client.config.embedcolor).setDescription(`${client.config.noEmoji} The 'image' link you provided isn't valid.`)]})
                isimageinvalid = true;
            }
        }
        
        if(hexatest.test(rawembedcolor)) {
            embedcolorunfiltered = rawembedcolor
        } else {
            if(disableColor == true) {
                embedcolorunfiltered = "#23272A"
            } else if(disableColor == null || disableColor == false) {
                embedcolorunfiltered = `#${client.config.embedcolor}`
            }
            
            if(rawembedcolor != null && hexatest.test(rawembedcolor) == false) {
                interaction.reply({embeds: [new EmbedBuilder().setColor().setDescription(`${client.config.noEmoji} The provided color isn't valid.`)]})
            }
        }

        embedcolor = embedcolorunfiltered.replaceAll('#', "")
        //Embeds
        const successEmbed = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setDescription(`${client.config.yesEmoji} The embed has successfully been sent.`)
        const messageEmbed = new EmbedBuilder()
        .setColor(embedcolor)
        .setTitle(title || null)
        .setDescription(message)
        .setImage(image)
        .setFooter({text: footertext, iconURL: footerimage})
        const usernopermsEmbed = new EmbedBuilder()
        .setColor('Red')
        .setDescription(`${client.config.noEmoji} You don't have permission to speak in this channel.`)
        const clientnopermsEmbed = new EmbedBuilder()
        .setColor('Red')
        .setDescription(`${client.config.noEmoji} I don't have permission to speak in this channel.`)

    
        if (interactionAuthor.permissionsIn(channel).has(PermissionFlagsBits.SendMessages) && interaction.guild.members.me.permissionsIn(channel).has(PermissionFlagsBits.SendMessages) && isfooterinvalid == false && isimageinvalid == false) {
            channel.send({embeds: [messageEmbed]})
            interaction.reply({embeds: [successEmbed], ephemeral: true})
        }  
        if(!interactionAuthor.permissionsIn(channel).has(PermissionFlagsBits.SendMessages)) {
                interaction.reply({embeds: [usernopermsEmbed], ephemeral: true});
        } else {
            if(!interaction.guild.members.me.permissionsIn(channel).has(PermissionFlagsBits.SendMessages)) {
                    interaction.reply({embeds: [clientnopermsEmbed], ephemeral: true})
            }
        }
    }
}
