const {
    readdirSync
} = require('fs')

const {
    MessageEmbed
} = require('discord.js')

const { prefix } = require('../config/config.json')


module.exports = {
    name : "help",
    description: "ヘルプコマンド。",

    run:(message,args,client) => {
        let commands = " "
        readdirSync('./cmd').forEach(cmd => {
            
            if(!cmd.endsWith('js')) return
            const { slash, name , description } = require('../cmd/'+cmd)

            if(slash) commands += `\n/${slash.name}\n\`${slash.description}\``
            if(name && description) commands += `\n${prefix}${name}\n\`${description}\``

        })
        const embed = new MessageEmbed().setTitle('help').setDescription(commands)
        message.channel.send({
            embeds:[embed]
        })
    }
}