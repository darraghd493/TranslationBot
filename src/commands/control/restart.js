const { startClient } = require('../../../');

module.exports = {
    name: "restart",
    aliases: [],
    description: "Restarts the bot",
    
    run: async function(message, client, args) {
        message.channel.send({
            content: `<@${message.author.id}>, restarting bot...`}).then((botMessage) => {
                setTimeout(() => {
                    if (botMessage.editable) // https://github.com/discordjs/discord.js/issues/7091
                        botMessage.delete();
                    
                    setTimeout(() => {
                    console.log("Restarting client...");
                    client.destroy();
                    startClient();
                    }, 1000);
                }, 5000);
        });
    }
}