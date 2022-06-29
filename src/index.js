require('dotenv').config()
require('colors');

// Import functions from packages
const { Client, Message, MessageEmbed, Intents, Collection } = require("discord.js");
const { QuickDB } = require("quick.db");
const Discord = require("discord.js");

const { promisify } = require("util");
const glob = promisify(require("glob").glob);

// Setup the client
async function startClient() {
    console.clear();

    console.log("Starting client...".blue);
    // Create the client
    const client = new Client({
        messageCacheLifetime: 60,
        fetchAllMembers: false,
        messageCacheMaxSize: 10,
        restTimeOffset: 0,
        restWsBridgetimeout: 100,
        shards: "auto",
        partials: ["MESSAGE", "CHANNEL", "REACTION"],
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });
    
    client.commands = new Collection();
    client.db = new QuickDB();
    client.prefix = "q"
    client.version = "1.0.0";

    function loadCommands() {
        // Load all commands
        console.log(" Loading commands...".blue);
        glob("./src/commands/**/*.js").then(map => {
            map.forEach(file => {
                console.log(`  Loading command ${file}`.gray);
                const command = require("." + file.slice(5, -3));
                client.commands.set(command.name, command);
            });
        });
    }


    function loadEvents() {
        // Load all events
        console.log(" Loading events...".blue);
        glob("./src/events/*.js").then(map => {
            map.forEach(file => {
                console.log(`  Loading event ${file}`.gray);
                const event = require("." + file.slice(5, -3));
                event.run(client);
            });
        });
    }

    // Load everything
    loadCommands();
    loadEvents();

    // Login to Discord
    client.login(process.env.TOKEN);
}

module.exports.startClient = startClient;
startClient();