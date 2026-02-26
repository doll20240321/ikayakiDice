const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// 1. 引入你的隨機功能模組
const { handleRandomChoice } = require('./choice-sos.js');
const { handleDiceRoll } = require('./dice-normal.js');

console.log("--- 偵錯模式 ---");
console.log("目前 index.js 所在的資料夾是:", __dirname);
console.log("嘗試讀取的 Token 前五碼:", process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN.substring(0, 5) : "什麼都沒讀到");
console.log("----------------");

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ 已登入為 ${client.user.tag}`);
});

client.on('messageCreate', message => {
    // 預防萬一：不要理會機器人自己的訊息
    if (message.author.bot) return;

    // --- 指令區開始 ---

    // 你的測試指令
    if (message.content === '測試') {
        message.reply('測試回應');
    }

    // 2. 這裡塞入「隨機」功能
    // 當訊息以「隨機 」(包含空白) 開頭時，就交給 choice-helper 處理
    if (message.content.startsWith('隨機 ')) {
        handleRandomChoice(message);

    if (message.content.startsWith('骰子 ')) {
        handleDiceRoll(message);
        }
        }
    // --- 指令區結束 ---
});

client.login(process.env.DISCORD_TOKEN);