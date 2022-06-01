## BotTemplate for you

### coding environment

Node.js v16.10.0
Discord.js V13.7.0

### At the beginning

```xl
npm install
```

### Run the bot

```
node index.js
```
Result : SumCheck starts from the top file in order

↓Something like this

![image](https://user-images.githubusercontent.com/83486999/171179157-f57622a1-e8da-43a1-a337-46c95b37659d.png)

When SumCheck is over and Ready to Bot comes out, it's a success.

### CommandFile example

Normal command :
```js
module.exports = {
 name: "CommandName",
 description: "Description",
 
 run: (message,args,client) => {
    message.reply('This is that.')
  }
}
```

SlashCommand (Recommendation) :

(The option has not been implemented yet. sry ;) )

```js
module.exports = { 
 slash: {
  name: "CommandName",
  description: "Description"
 },
 run: (interaction, client) => {
    interaction.reply('Hi')
  }
}
```

### Trouble Shooting of SumCheck

```
[SumCheck] Infomation : Command Name (CommandName) is not description.
```
This is an error thrown when no description is attached in the command file. 
There is nothing that doesn't work, but it may not appear in the help command, so be sure to attach a description.

```
[SumCheck] Warning : Commandfile (fileName) is not js file. Please check this.
```
This is a warning thrown when the command file contains something that does not have a js extension.
This bot only supports js extensions.

```
[SumCheck] Reg : Registered the (CommandName) Command.
```
This is a registed the slashcommand send a infomation in console.

```
[SumCheck] Warning : Commandfile in not RUN function. Please check this.
```
This is an error that occurs when the command file is set normally but the execution part does not exist.


