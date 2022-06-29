module.exports = {
    name: "kill",
    aliases: [],
    description: "Kills the bot",
    
    run: async function(message, client, args) {
        message.channel.send({
            content: `<@${message.author.id}>, killing the bot...`}).then((botMessage) => {
                setTimeout(() => {
                    if (botMessage.editable) // https://github.com/discordjs/discord.js/issues/7091
                        botMessage.delete();
                    
                    setTimeout(() => {
                        console.log("Killing client...");
                        client.destroy();
                    }, 1000);
                }, 5000);
        });
    }
}