const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "gali",
    version: "2.0",
    author: "BADHON",
    longDescription: "Automatically replies to bad words with audio",
    category: "Fun",
    guide: {
      en: "Bot will automatically respond to bad words"
    },
    usePrefix: false
  },

  onStart: async function (context) {
    await module.exports.sendDefaultResponse(context);
  },

  onChat: async function ({ event, message, usersData }) {
    const body = (event.body || "").toLowerCase().trim();
    const badWords = [
      "shoytan pola",
      "shoytan",
      "pola",
" dhon",
"বাল",
" হেডা",
"চুদি",
"মাগি",
" মারে ",
      "khanikir",
      "harami",
      "harami",
      "beiman",
      "kuttar",
      "kutta",
      "madarchod",
      "bapchod",
      "chodna",
      "chudi",
      "chud",
      "chod",
      "khanki",
      "khankir",
      "bal",
      "baler",
      "voda",
      "vodar",
      "nat",
      "nater",
      "fuck",
      "bitch",
      "asshole",
      "motherfucker",
      "mc",
      "bc",
    ];
    const containsBadWord = badWords.some(word => 
      body.includes(word.toLowerCase())
    );

    if (containsBadWord) {
      const audioURL = "https://files.catbox.moe/0ivvmp.mp3";
"https://files.catbox.moe/aekrok.mp3",
"https://files.catbox.moe/3xfv1z.mp3",
"https://files.catbox.moe/fjvorm.mp3",
"https://files.catbox.moe/1bye8r.mp3",
"https://files.catbox.moe/u5zll1.mp3",
"https://files.catbox.moe/ghr6x2.mp3",
"https://files.catbox.moe/lsjfw4.mp3",
"https://files.catbox.moe/f924xx.mp3"

      await module.exports.sendAudioResponse({ 
        event, 
        message, 
        usersData, 
        audioURL 
      });
    }
  },

  sendDefaultResponse: async function ({ message }) {
    await message.reply("koto boro shahosh tui amake gali dili😒");
  },

  sendAudioResponse: async function ({ event, message, usersData, audioURL }) {
    try {
      const attachment = await getStreamFromURL(audioURL);
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;
      const mentions = [{ id, tag: name }];

      await message.reply({ 
        body: `${name}, koto boro shahosh tui amake gali dili😒!`,
        attachment,
        mentions 
      });
    } catch (error) {
      console.error("Error sending audio:", error);
      await message.reply("Audio pathte somossa hocche!");
    }
  }
};
