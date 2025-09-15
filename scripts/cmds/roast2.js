module.exports = {
    config: {
        name: "maruf👍tor🥱abbu",
        version: "1.1",
        author: "BADHON",
        role: 0,
        shortDescription: "Auto audio response to text triggers",
        longDescription: "Responds to exact text triggers without mixing.",
        category: "autoresponse",
        guide: "No prefix needed - use exact text triggers"
    },

    onStart: async function() {},

    onChat: async function({ event, message }) {
        try {
            const msg = event.body.trim();
            const lowerMsg = msg.toLowerCase();
            
            
            const textTriggers = [ 
"xudi", "xdi", "mgi", "chudi", "cdi", "fudu", "magi", "khanki", 
                "bara", "shala", "harami", "machik", "beshya", "fuckyou", "lund", 
                "choda", "mara", "gud", "boka", "chudi", "mush", "kutta", "hagu",
                "bainchod", "madarchod", "randi", "khankir pola", "mayer gud",
                "bapok", "khankir bacha", "magi choda", "fuck", "motherchod",
                "mairala", "khanki pola", "bessha", "faltu", "nengta", "magi pagol",
                "খানকির পোলা", "তোরে চুদি", "মাদারচোদ", "বেশশা", "তর মার ভোদা", 
                "চুইদদা ফালা ফালা করি", "চুদি তরে মাদারচোদ", "তর বইন চুদি", 
                "তর বউয়ের দুধ", "তর বউয়ের ভোদা", "খানকির পোলা চুদি",
                "হারামির পোলা", "মাগির বাচ্চা", "বাপের না", "হাগুর পোলা", "চোদার পোলা",
                "নেটওয়ার্ড মারি", "বস্তির মাগি", "গাঁয়ের মাগি", "পোলাপাইনের বাচ্চা",
                "ভোদার বীজ", "চুতমারানি", "হারামজাদা", "হারামখোর", "জারজের বাচ্চা",
                "khankir pola", "tore cdi", "madarchod", "bessha", "tor mar voda",
                "chudda fala fala kori", "chudi tore madarchod", "tor bon chudi",
                "tor bouer dudh", "tor bouer voda", "khankir pola cdi",
                "haramir pola", "magir bachha", "baper na", "hagur pola", "chodar pola",
                "netward mari", "bastir magi", "gayer magi", "polapainer bachha",
                "vodar bij", "chutmarani", "haramjada", "haramkhor", "jarjer bachha",
                "motherfucker", "sisterfucker", "whore son", "bastard", "son of bitch",
                "fucker", "cunt", "pussy", "dickhead", "asshole", "mother lover",
                "sister lover", "dog fucker", "donkey fucker", "pig fucker",
                "ma er khela", "baba er chele", "apu er bhai", "vai er bon", 
                "nani er chele", "dadu er pola", "khalu er bacha", "mama er chele",
                "ma er bou", "baba er bou", "bon er shami", "bhai er bou",
                "voda marani", "vodar bacha", "dhon er bacha", "fota khao",
                "dhonu khao", "budar juice", "vodar pani", "dhoner sosha",
                "মায়ের লাথি", "বাপের চড়", "বোনের ঠ্যাঁটা", "ভাইয়ের চপেট", 
                "খালার থাপ্পড়", "মামার ঘুষি", "দাদুর লাথি", "নানির চড়",
                "ma er lathi", "baper chor", "boner thanta", "bhayer chopot",
                "khalar thappor", "mamar ghushi", "dadur lathi", "nanir chor",
                "গরিবের বাচ্চা", "ফকিরের পোলা", "ভিক্ষুকের ছেলে", "মাস্তানের বেটা",
                "goriber bachha", "fakirer pola", "bhikkhuker chele", "mastaner beta",
                "যার বাপ হারামি তার ছেলে খানকি", "মায়ে চোদা বাপে চোদা",
                "jar bap harami tar chele khanki", "maye choda bape choda" ];
            if (textTriggers.some(trigger => lowerMsg === trigger)) {
                return message.reply({
                    attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/ws659w.mp3"),
                    body: "chudi"
                });
            }
        } catch (error) {
            console.error("Error in roast2 command:", error);
        }
    }
};
