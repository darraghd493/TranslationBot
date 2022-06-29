module.exports = {
    name: "createchannel",
    aliases: [],
    description: "Creates a new channel",
    
    run: async function(message, client, args) {
        message.channel.send({
            content: `<@${message.author.id}>, creating channel...`}).then((botMessage) => {
        }).then((botMessage) => {
            if (!client.db.has(message.guiild.id)) 
                client.db.set(message.guild.id, []);
            
            client.db.add(message.guild.id, args[0]);

            if (botMessage.editable) {
                botMessage.edit({
                    content: `<@${message.author.id}>, channel ${args[0]} created!`
                }).then((botMessage) => {
                    setTimeout(() => {
                        if (botMessage.editable)
                            botMessage.delete();
                    }, 5000);
                });
            }
        });
    }
}