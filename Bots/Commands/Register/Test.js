module.exports = {
    conf: {
        name: "Test",
        aliases: ["test", "test"],
        description: "Fear.",
        usage: ".test",
        category: "Test Komutları",
    },
    execute: async (client, message, args) => {
        message.reply("Test Komutu Başarılı!");
    },
};