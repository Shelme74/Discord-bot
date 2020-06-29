/**
 * Copyright(C) 2020  Shelme74
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or(at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.If not, see<https://www.gnu.org/licenses/>.
 *
 */

const Discord = require('discord.js');
const auth = require('./auth.json');
const package = require('./package.json');

// Initialize Discord Bot
const bot = new Discord.Client();
const token = auth.token;
const test = 0;
bot.login(token);
if (test === 1) {
    bot.on('ready', () => {
        console.log('Connected'),
        bot.user.setActivity('Version ' + package.version + ' (test version)')
    });
}

if (test === 0) {
    bot.on('ready', () => {
        console.log('Connected'),
            bot.user.setActivity('Version ' + package.version)
    });
}

bot.on('message', message => {
    if (message.author.bot) return;

    if (message.content.indexOf('!') === 0) {
        var cmd = message.content.substring(1);

        switch (cmd) {
            // !ping
            case 'ping':
                console.log('Ping received');
                message.channel.send('Pong!');
                console.log('Pong sent');
                break;
            // !hello
            case 'hello':
                console.log(message.author.username + '#' + message.author.discriminator + ' said hello');
                message.reply('Hello!');
                console.log('Replied to ' + message.author.username + '#' +  message.author.discriminator);
                break;
            // !info
            case "info":
                switch (test) {
                    case 1:
                        var infomsg = new Discord.MessageEmbed()
                            .setColor([189, 16, 224])
                            .setTitle(':robot: Bot\'s infos')
                            .addField("General-Commands", "!ping, !hello, !info, !tts")
                            .addField("I also am a Dadbot!", "Try to type `I'm (what you want)` and you'll see!")
                            .addField("Version", package.version + " (test version)")
                            .setTimestamp(Date.now());
                        message.channel.send(infomsg);
                        break;
                    case 0: {
                        var infomsg = new Discord.MessageEmbed()
                            .setColor([189, 16, 224])
                            .setTitle(':robot: Bot\'s infos')
                            .addField("General-Commands", "!ping, !hello, !info, !tts")
                            .addField("I also am a Dadbot!", "Try to type `I'm (what you want)` and you'll see!")
                            .addField("Version", package.version)
                            .setTimestamp(Date.now());
                        message.channel.send(infomsg);
                        break;
                    }
                }
                break;
            // !tts
            case 'tts':
                message.channel.send('So you wanted to hear a TTS message? No problem!', {tts: true});
                break;
        }
    }

    // reply to "I'm `something`" by "Hi `something` I'm dad!"
    var dadbot = 0;
    if (message.content.indexOf("I\'m") === 0) {
        dadbot = 1;
    }
    else if (message.content.indexOf("I\u2019m") === 0) {
        dadbot = 1;
    }
    else {
        dadbot = 0;
    }

    if (dadbot === 1) {
        var name = message.content.substring(4);

        message.channel.send('Hi ' + name + '! I\u2019m dad!')
    }

});
