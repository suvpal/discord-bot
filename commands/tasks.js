const {SlashCommandBuilder} = require('@discordjs/builders');
const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("This is a modal"),
    async execute(interaction) {
        const modal = new ModalBuilder()
        .setTitle("TEST MODAL")
        .setCustomId("modal")

        const name = new TextInputBuilder()
        .setCustomId('name')
        .setRequired(true)
        .setLabel("Provide us with your name")
        .setStyle(TextInputStyle.Short);

        const about = new TextInputBuilder()
        .setCustomId('task')
        .setRequired(true)
        .setLabel("Provide us with the task you wish to add")
        .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(name)
        const secondActionRow = new ActionRowBuilder().addComponents(about)

        modal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(modal)
    }
}

