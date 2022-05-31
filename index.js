const {
    Client,
    Intents
} = require('discord.js')
const {
   readFileSync ,
   readdirSync,
   read
} = require('fs')

const option = {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
}

const client = new Client(option)

client.login(token)

/////////////////////////////////////////////////////////////////

const black   = '\u001b[30m';const red     = '\u001b[31m';const green   = '\u001b[32m';const yellow  = '\u001b[33m';const blue    = '\u001b[34m';const magenta = '\u001b[35m';const cyan    = '\u001b[36m';const white   = '\u001b[37m';const reset   = '\u001b[0m';

////////////////////////////////////////////////////////////////

//let commandfile = require('./cmd')

client.on('ready', async () => {

    readdirSync('./cmd').forEach(async cmd => {
    
    //異端児を弾いちゃうぞ💛
    if(!cmd.endsWith('js')) return console.log(`[${green}SumCheck${reset}] ${yellow}Warning${reset} : Commandfile (${cmd}) is not js file. Please check this.`)

      const { name , slash, description , run} = require(`./cmd/${cmd}`)
      let cmdname = name
      if(name && !description) console.log(`[${green}SumCheck${reset}] ${blue}Infomation${reset} : Command name ${name} is not description.`)
      if(!run) return console.log(`[${green}SumCheck${reset}] ${yellow}Warning${reset} : Commandfile (${name}) is not RUN function. Please check this.`)
      if(!name && slash) cmdname = slash.name
      console.log(`[${green}SumCheck${reset}] ${yellow}I${reset} : Load the ${cmdname} Command file.`)
      if(slash){
          if(!slash.name || !slash.description) return console.log(`${yellow}Warning${reset} : SlashCommandOption in not option. Please check this,`)
          const slashcommand = [
              {
                  name: slash.name,
                  description: slash.description
              }
          ]
          await console.log(`[${green}SumCheck${reset}] ${blue}Reg ${reset}: Registered the ${slash.name} Command.`)
          await client.application.commands.set(slashcommand);
      }

      
  });
    console.log(`[${red}SystemLog${reset}] Ready to bot.`)
})

client.on('messageCreate', async (message) => {

    ////////////////////////////////////////////////////////
    const { prefix } = require('./config/config.json')
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    ///////////////////////////////////////////////////////
    
    if(message.author.bot) return

    readdirSync('./cmd').forEach(cmd => {

        if(!cmd.endsWith('js')) return
    
        const { name , slash , run } = require(`./cmd/${cmd}`)
        if(slash && name) return console.log(`${yellow}Error${reset}: スラッシュコマンドとメッセージコマンドを共存させることはできません。`)
        if(command === name){
          if(!run) return console.log(`${yellow}Error${reset} : Commandfile in not RUN function. Please check this.`)
           run(message,args,client)
        }
    }) 
})


client.on('interactionCreate', async (interaction) => {

    readdirSync('./cmd').forEach(cmd => {

        if(!cmd.endsWith('js')) return

        const { slash , name , run } = require(`./cmd/${cmd}`)

        ///////////////////////////////////////////////////////
        if(!slash) return
        if(name && slash) return console.log(`${yellow}Error${reset}: スラッシュコマンドとメッセージコマンドを共存させることはできません。`)
        ///////////////////////////////////////////////////////


        if(interaction.commandName === slash.name){
            run(interaction,client)
        }
    })
})

