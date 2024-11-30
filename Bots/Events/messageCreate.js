const { prefix } = require('../../Global/Config/Settings.js');

module.exports = {
    name: 'messageCreate',
    execute: async (client, message) => {
        if (message.author.bot || !message.guild) return;
        const prefixes = Array.isArray(prefix) ? prefix : [prefix];
        const usedPrefix = prefixes.find(p => message.content.startsWith(p));
        if (!usedPrefix) return;
        const args = message.content.slice(usedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(commandName));
        if (!command) return;
        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(`Komut çalıştırılırken bir hata oluştu: ${error.message}`);
            message.reply('Komut çalıştırılamadı.');
        }
    },
};
