const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "jibon",
    version: "1.0",
    author: "💋𝗠𝗢𝗦𝗧𝗔𝗞𝗜𝗠 × 𝗕𝗔𝐃𝐇𝐎𝐍💀",
    countDown: 5,
    role: 0,
    shortDescription: "Jibon information",
    longDescription: "Displays information about Jibon when triggered",
    category: "reply",
  },
  
  onStart: async function () {},
  
  onChat: async function ({ event, message, getLang }) {
    if (event.body?.toLowerCase() !== "jibon ke") {
      return;
    }

    const replyText = `
╔════════════════════════╗
       ✦ Jibon bot info ✦
╚════════════════════════╝

➤ 𝗢𝘄𝗻𝗲𝗿: FMZ JIBON
➤ 𝗥𝗼𝗹𝗲: Bot Administrator
➤ 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: Muslim
➤ 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: Noakhali, Bangladesh
➤ 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻: Inter 2nd Year

╔════════════════════════╗
       📱 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗜𝗡𝗙𝗢 📱
╚════════════════════════╝

➤ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: Dimu na😾
➤ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: JIBON_MALS
➤ 𝗬𝗼𝘂𝗧𝘂𝗯𝗲: JIBON RX!
➤ 𝗣𝗵𝗼𝗻𝗲: 01894398338

➤ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: JIBON BBZ
➤ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: 1.0.0
➤ 𝗣𝗿𝗲𝗳𝗶𝘅: ?
➤ 𝗦𝗲𝗿𝘃𝗲𝗿: Online 24/7

╔════════════════════════╗
       JIBON BOT
╚════════════════════════╝
`;

    try {
      
      let videoUrl = "https://files.catbox.moe/2acx7d.mp4";
      let response = await axios.get(videoUrl, { responseType: "stream" });
      
      
      if (!response.data) {
        videoUrl = "https://drive.google.com/uc?export=download&id=10NCI0fJW4mwMKmTr7NW15yc0DhB5A8Ad";
        response = await axios.get(videoUrl, { responseType: "stream" });
      }

      
      const tempDir = path.join(__dirname, 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const videoPath = path.join(tempDir, 'jibon.mp4');
      const writer = fs.createWriteStream(videoPath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      return message.reply({
        body: replyText,
        attachment: fs.createReadStream(videoPath)
      });

    } catch (err) {
      console.error("Error:", err);
      return message.reply({
        body: replyText + "\n\n[Video unavailable right now]",
      });
    }
  }
};
