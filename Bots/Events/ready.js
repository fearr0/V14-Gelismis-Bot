const { Events, ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const ayar = require('../../Global/Config/const.js');

module.exports = {
    name: Events.ClientReady,
    once: false,
    async execute(client) {
        console.log(`${client.user.tag} başarıyla giriş yaptı!`);

        // Sunuculardaki toplam üye sayısını konsola yazdır
        const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        console.log(`Botun bulunduğu sunuculardaki toplam üye sayısı: ${totalMembers}`);

        const VoiceChannel = client.channels.cache.get(ayar.BOT_VOICE_CHANNEL);
        joinVoiceChannel({
            channelId: VoiceChannel.id,
            guildId: VoiceChannel.guild.id,
            adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false
        });

        setInterval(() => {
            const fear = Math.floor(Math.random() * ayar.BOT_STATUS.length);
            client.user.setPresence({
                activities: [
                    {
                        name: ayar.BOT_STATUS[fear],
                        type: ActivityType.Streaming,
                        url: ayar.URL
                    },
                ],
                status: "dnd",
            });
        }, 10000);


    },
};
