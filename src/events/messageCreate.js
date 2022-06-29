const fs = require('fs');

module.exports = {
    name: 'messageCreate',
    run: function(client) {
        // On message received
        client.on("messageCreate", async (message) => {
            if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.prefix)) 
                return;
            
            const args = message.content.slice(client.prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            
            if (!client.commands.get(commandName)) 
                return;
            
            try {
                client.commands.get(commandName).run(message, client, args);
            } catch (e) {
                console.error("Suffered error whilst executing %s: \n   %s", commandName, e)
            }
        });
    }
}