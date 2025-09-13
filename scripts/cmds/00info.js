const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "info",
    aliases: ["info", "stats"],
    version: "1.0",
    author: "BADHON",
    role: 0,
    shortDescription: {
      en: "Get the Bot information such as uptime, ping, and group info."
    },
    longDescription: {
      en: "Displays bot uptime, ping, and information about the current group."
    },
    category: "Info",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    try {
      
      const loadingMsg = await api.sendMessage("𝗖𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝗕𝗼𝘁'𝘀 𝗜𝗻𝗳𝗼...", event.threadID);
      
     
      const [threadInfo, uptime, ping] = await Promise.all([
        this.getThreadInfo(api, event.threadID),
        this.getUptime(),
        this.getPing(api, event.threadID, loadingMsg.messageID)
      ]);

     
      const message = this.createInfoMessage(threadInfo, uptime, ping);
      
     
      try {
        const videoPath = await this.downloadVideo();
        await api.sendMessage(
          {
            body: message,
            attachment: fs.createReadStream(videoPath)
          },
          event.threadID
        );
        
        fs.unlinkSync(videoPath);
      } catch (videoError) {
        console.warn("Video not available, sending text only:", videoError);
        await api.sendMessage(message, event.threadID);
      }

    } catch (error) {
      console.error("ERROR in info command:", error);
      api.sendMessage("❌ An error occurred while fetching bot information. Please try again later.", event.threadID);
    }
  },

  
  getThreadInfo: async function(api, threadID) {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const { participantIDs, messageCount, threadName, adminIDs, userInfo } = threadInfo;
      
      
      let maleCount = 0, femaleCount = 0;
      for (const user of userInfo) {
        if (user.gender === "MALE") maleCount++;
        else if (user.gender === "FEMALE") femaleCount++;
      }

   
      let adminNames = [];
      if (adminIDs && adminIDs.length > 0) {
        const adminInfo = await api.getUserInfo(adminIDs.map(a => a.id));
        adminNames = Object.values(adminInfo).map(admin => admin.name);
      }

      return {
        name: threadName || "Unnamed Group",
        id: threadID,
        members: participantIDs.length,
        maleCount,
        femaleCount,
        adminCount: adminIDs ? adminIDs.length : 0,
        adminNames,
        messageCount: messageCount || 0
      };
    } catch (error) {
      console.error("Error getting thread info:", error);
      return {
        name: "Unknown Group",
        id: threadID,
        members: 0,
        maleCount: 0,
        femaleCount: 0,
        adminCount: 0,
        adminNames: [],
        messageCount: 0
      };
    }
  },

 
  getUptime: function() {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}Hrs ${minutes}min ${seconds}sec`;
  },


  getPing: async function(api, threadID, messageID) {
    try {
      const timeStart = Date.now();
     
      await api.editMessage("Ping check...", messageID);
      return Date.now() - timeStart;
    } catch (error) {
      console.error("Error calculating ping:", error);
      return "N/A";
    }
  },

  
  downloadVideo: async function() {
    try {
      const videoUrl = "https://files.catbox.moe/fsfqcx.mp4";
      const videoPath = path.join(__dirname, "botinfo.mp4");

      const response = await axios({
        method: 'GET',
        url: videoUrl,
        responseType: 'stream',
        timeout: 30000
      });

      const writer = fs.createWriteStream(videoPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(videoPath));
        writer.on('error', reject);
      });
    } catch (error) {
      console.error("Error downloading video:", error);
      throw new Error("Video download failed");
    }
  },

  
  createInfoMessage: function(threadInfo, uptime, ping) {
    const { name, id, members, maleCount, femaleCount, adminCount, adminNames, messageCount } = threadInfo;
    
    let message = `╭───── 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ─────⭓\n`;
    message += `├─「𝐔𝐏𝐓𝐈𝐌𝐄」\n`;
    message += `│» ${uptime}\n`;
    message += `├─「𝐏𝐈𝐍𝐆」\n`;
    message += `│» ${ping}ms\n`;
    message += `├─「𝐆𝐑𝐎𝐔𝐏 𝐈𝐍𝐅𝐎」\n`;
    message += `│» Name: ${name}\n`;
    message += `│» ID: ${id}\n`;
    message += `│» Members: ${members}\n`;
    message += `│» Male: ${maleCount} | Female: ${femaleCount}\n`;
    message += `│» Admins: ${adminCount}\n`;
    
    if (adminNames.length > 0) {
      message += `│» Admin List:\n`;
      adminNames.slice(0, 5).forEach(name => {
        message += `│   • ${name}\n`;
      });
      if (adminNames.length > 5) {
        message += `│   ... and ${adminNames.length - 5} more\n`;
      }
    }
    
    message += `│» Messages: ${messageCount}\n`;
    message += `╰────────────────────⭓`;
    
    return message;
  }
};
