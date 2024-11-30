module.exports = {
    conf: {
        name: "",
        aliases: [""],
        description: "Botun tüm komutlarını ve kategorilerini gösterir.",
        usage: "",
        category: "Kullanıcı Komutları",
    },
    execute: async (client, message, args) => {
        message.reply("Komut çalıştırıldı!");
    },
};