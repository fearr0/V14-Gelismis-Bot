const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    conf: {
        name: 'Yardım',
        aliases: ['yardım', 'y', 'help', 'h'],
        description: "Botun tüm komutlarını ve kategorilerini gösterir.",
        usage: ".yardım",
        category: 'Kullanıcı Komutları',
    },
    execute: async (client, message, args) => {

        const categories = {};
        client.commands.forEach((command) => {
            const category = command.conf.category || "Diğer";
            if (!categories[category]) categories[category] = [];
            categories[category].push(command);
        });

        const menuOptions = Object.keys(categories).map((category) => ({
            label: category.charAt(0).toUpperCase() + category.slice(1),
            value: category,
            description: `${categories[category].length} komut içeriyor.`,
        }));

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('help_menu')
            .setPlaceholder('Bir kategori seçin.')
            .addOptions(menuOptions);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setTitle('Yardım Menüsü')
            .setDescription('Bir kategori seçerek komutları görüntüleyebilirsiniz.')
            .setColor('Random');

        const helpMessage = await message.reply({ embeds: [embed], components: [row] });

        const filter = (interaction) =>
            interaction.isStringSelectMenu() && interaction.customId === 'help_menu' && interaction.user.id === message.author.id;

        const collector = helpMessage.createMessageComponentCollector({
            filter,
            time: 60000,
        });

        collector.on('collect', async (interaction) => {
            const selectedCategory = interaction.values[0];
            const commands = categories[selectedCategory];

            const categoryEmbed = new EmbedBuilder()
                .setTitle(`${selectedCategory} Kategorisi - Komutlar`)
                .setDescription(
                    commands
                        .map(
                            (cmd) =>
                                `**${cmd.conf.name}** - ${cmd.conf.description || 'Açıklama yok.'}\nKullanım: \`\`${cmd.conf.usage || 'Belirtilmemiş'}\`\``
                        )
                        .join('\n\n')
                )
                .setColor('Random');

            await interaction.update({ embeds: [categoryEmbed], components: [row] });
        });

        collector.on('end', () => {
            helpMessage.edit({ components: [] }).catch(() => { });
        });
    },
};
