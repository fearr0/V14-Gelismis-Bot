const { Client, GatewayIntentBits, Collection } = require('discord.js');
const settings = require('../Config/Settings.js');
const fs = require('fs');
const path = require('path');

// Yeni bir client oluştur
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

global.client = client;
client.commands = new Collection();
client.aliases = new Collection();

const commandsPath = path.resolve(__dirname, "../../Bots/Commands");
fs.readdir(commandsPath, (err, folders) => {
    if (err) {
        console.error(`[Hata] Komut klasörleri okunamadı: ${err.message}`);
        return;
    }

    folders.forEach((folder) => {
        const folderPath = path.join(commandsPath, folder);
        fs.readdir(folderPath, (err2, files) => {
            if (err2) {
                console.error(`[Hata] ${folder} klasörü okunamadı: ${err2.message}`);
                return;
            }
            files
                .filter((file) => file.endsWith(".js"))
                .forEach((file) => {
                    const commandPath = path.join(folderPath, file);
                    try {
                        const command = require(commandPath);
                        if (command.conf && command.conf.name) {
                            client.commands.set(command.conf.name, command);
                            console.log(`[✔] Yüklenen Komut: ${command.conf.name}`);
                            if (Array.isArray(command.conf.aliases)) {
                                command.conf.aliases.forEach((alias) => {
                                    client.aliases.set(alias, command.conf.name);
                                });
                            }
                        } else {
                            console.warn(`[Uyarı] ${file} dosyasında geçerli bir komut bulunamadı.`);
                        }
                    } catch (error) {
                        console.error(`[Hata] ${file} dosyası yüklenemedi: ${error.message}`);
                    }
                });
        });
    });
});

const eventsPath = path.join(__dirname, '../../Bots/Events'); 
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

module.exports = client;
