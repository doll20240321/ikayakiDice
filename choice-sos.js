// choice-helper.js

/**
 * 處理隨機選擇的邏輯
 * @param {import('discord.js').Message} message 
 */
function handleRandomChoice(message) {
    // 1. 取得指令內容 (移除前 3 個字元並修剪空白)
    const content = message.content.slice(3).trim();

    // 2. 使用正規表達式處理半形與全形空白
    const args = content.split(/[\s　]+/);

    // 3. 防呆：如果沒給選項
    if (!content || args.length === 0 || args[0] === '') {
        return message.reply('魷沒得選');
    }

    // 4. 隨機選一個
    const picked = args[Math.floor(Math.random() * args.length)];

    // 5. 回覆結果
    message.reply(`**${picked}**`);
}

// 關鍵：把這個 function 導出，讓 index.js 可以使用
module.exports = { handleRandomChoice };