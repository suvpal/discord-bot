const { SlashCommandBuilder } = require('discord.js');
const { n } = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('printtasks')
		.setDescription('Replies with submitted tasks'),
	async execute(interaction) {
		await interaction.reply(n)
	}
};