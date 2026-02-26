// dice-normal.js

/**
 * 處理骰子邏輯 (格式: xdy)
 * @param {import('discord.js').Message} message 
 */
function handleDiceRoll(message) {
    // 1. 取得指令 (假設指令是 "!r 3d6"，slice(3) 是去掉 "!r ")
    const content = message.content.slice(3).trim(); 

    // 2. 使用 Regex 抓取數字： (顆數) d (面數)
    const match = content.match(/^(\d+)d(\d+)$/i);

    if (!match) {
        return message.reply('魷不知道你在擲什麼...格式要像 `3d6` 喔！');
    }

    const count = parseInt(match[1]); // 顆數
    const sides = parseInt(match[2]); // 面數

    // 3. 防呆機制
    if (count <= 0 || count > 50) return message.reply('魷魚手不夠多，最多只能擲 50 顆喔！');
    if (sides <= 1 || sides > 1000) return message.reply('這種面數的骰子...魷魚沒見過。');

    // 4. 開始擲骰
    let results = [];
    let total = 0;

    for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        results.push(roll);
        total += roll;
    }

    // 5. 格式化回覆
    const resultString = results.join(' + ');
    
    // 修正點：補上結尾的反引號，並讓輸出的括號漂亮一點
    message.reply(`${message.author}\n🦑つ🎲[ ${content} ]\n→ ( ${resultString} ) = **${total}**`);
}

// 這是最關鍵的一行，沒加的話 index.js 會報錯！
module.exports = { handleDiceRoll };