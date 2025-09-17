module.exports = {
    config: {
        name: "vaudio",
        version: "1.1",
        author: "Jibon & chatGPT",
        role: 0,
        shortDescription: "Auto audio response to pure emojis or text triggers",
        longDescription: "Responds only to pure emoji combinations or exact text triggers without mixing.",
        category: "autoresponse",
        guide: "No prefix needed - use either pure emojis or exact text triggers"
    },

    onStart: async function() {},

    onChat: async function({ event, message }) {
        try {
            const msg = event.body.trim();
            const lowerMsg = msg.toLowerCase();

            
            const isOnlyEmojis = /^(\p{Emoji}|\s)+$/u.test(msg);
            
           
            const textTriggers = ["cheka khaise", "gf chaira gese", "bow marse"];
            if (!isOnlyEmojis && textTriggers.some(trigger => lowerMsg === trigger)) {
                return message.reply({
                    attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/fqgxbn.mp3"),
                    body: "bow marse"
                });
            }

            
            if (isOnlyEmojis) {
                const laughEmojis = ["😆", "🤣", "😂", "😹"];
                const sadEmojis = ["🥺", "😭", "😿", "🥲"];
                const annoyedEmojis = ["🙄", "😒"];

                if (laughEmojis.some(emoji => msg.includes(emoji))) {
                    return message.reply({
                        attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/1c6jpm.ogg"),
                        body: "😂"
                    });
                }
                else if (sadEmojis.some(emoji => msg.includes(emoji))) {
                    return message.reply({
                        attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/oak5zx.ogg"),
                        body: "🥺"
                    });
                }
                else if (annoyedEmojis.some(emoji => msg.includes(emoji))) {
                    return message.reply({
                        attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/wyoxmq.ogg"),
                        body: "🙄"
                    });
                }
            }
        } catch (error) {
            console.error("Error in vaudio command:", error);
        }
    }
};
