const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios").default;

const { telegram } = require("./utils/notify");

// replace the value below with the Telegram token you receive from @BotFather
// t.me/my_tbeng_bot
const token = "6408656135:AAFCJuavnrdd7oA5aDcJ6oYqyYkxJznoKns";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome!");

});

bot.onText(/\/sendpic/, (msg) => {

    bot.sendPhoto(msg.chat.id,"https://files.amakuni.com/saru/3896.JPG",{caption : "Here we go ! \nThis is just a caption "} );

});

bot.on('message', (msg) => {

    var hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
        console.log("msg.chat.id", msg.chat.id)
        bot.sendMessage(msg.chat.id,"Hello dear user");
    }

    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }

});

