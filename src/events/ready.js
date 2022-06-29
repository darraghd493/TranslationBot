const fs = require('fs');
const { glob } = require("glob");

module.exports = {
    name: 'ready',
    run: function(client) {
        // Ready the client
        client.on("ready", () => {
            // Log that the bot is ready
            console.log("%s is ready", client.user.tag);

            // Set the presence
            client.user.setActivity("for messages to translate", { type: "WATCHING" });
        });
    }
}