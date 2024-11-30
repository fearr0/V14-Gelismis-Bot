const { prefix } = require('../../Global/Config/Settings.js');

module.exports = {
    name: 'messageCreate',
    execute: async (client, message) => {
        // Botun kendisine veya DM'lere yanıt vermesini engelle
        if (message.author.bot || !message.guild) return;

        // Çoklu prefix desteği
        const prefixes = Array.isArray(prefix) ? prefix : [prefix];
        const usedPrefix = prefixes.find(p => message.content.startsWith(p));

        // Prefix bulunamadıysa mesaj yok sayılır
        if (!usedPrefix) return;

        // Komutun adını ve argümanlarını ayır
        const args = message.content.slice(usedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Komutu ve alias'ını kontrol et
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(commandName));

        if (!command) return; // Geçerli bir komut bulunmazsa çık

        // Komutu çalıştır
        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(`Komut çalıştırılırken bir hata oluştu: ${error.message}`);
            message.reply('Komut çalıştırılamadı.');
        }
    },
};