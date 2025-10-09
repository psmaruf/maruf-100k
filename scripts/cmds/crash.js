module.exports = {
  config: {
    name: "crash",
    version: "1.0",
    author: "Badhon",
    category: "cuties",
    role: 0,
    usePrefix: true,
    description: "Send a random crash video",
    usage: "Just type {p}edit and the bot will send a random edit video",
    cooldown: 2,
  },
  
  onStart: async function({ message }) {
    try {
      const videos = [
        "https://files.catbox.moe/xrire5.mp4",
        "https://files.catbox.moe/3jixxl.mp4",
        "https://files.catbox.moe/56n92p.mp4",
        "https://files.catbox.moe/lzmh3m.mp4",
        
        
        "https://files.catbox.moe/wljs35.mp4",
        "https://files.catbox.moe/x5krt5.mp4"
      ];
      
 
      const randomIndex = Math.floor(Math.random() * videos.length);
      const randomVideo = videos[randomIndex];
      
   
      message.reply({
        body: "💃  maruf er crash  🥵!",
        attachment: await global.utils.getStreamFromURL(randomVideo)
      });
      
    } catch (error) {
      console.error("Error in edit command:", error);
      message.reply("❌ An error occurred while sending the crash video. Please try again later.");
    }
  }
};
