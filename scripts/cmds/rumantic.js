module.exports = {
  config: {
    name: "🌚",
    version: "1.0",
    author: "Badhon",
    category: "cuties",
    role: 0,
    usePrefix: true,
    description: "Send a random  video",
    usage: "Just type {p}edit and the bot will send a random  video",
    cooldown: 2,
  },
  
  onStart: async function({ message }) {
    try {
      const videos = [
        "https://files.catbox.moe/rqqzai.mp4",
        "https://files.catbox.moe/f17enh.mp4",
        "https://files.catbox.moe/61bgi9.mp4",
        "https://files.catbox.moe/u4ba4g.mp4",
        "https://files.catbox.moe/x39q2p.mp4",
        
        
       
        "https://files.catbox.moe/d9ugoh.mp4"
        
      ];
      
 
      const randomIndex = Math.floor(Math.random() * videos.length);
      const randomVideo = videos[randomIndex];
      
   
      message.reply({
        body: "💃 ps maruf gaming  🥵!",
        attachment: await global.utils.getStreamFromURL(randomVideo)
      });
      
    } catch (error) {
      console.error("Error in edit command:", error);
      message.reply("❌ An error occurred while sending the video. Please try again later.");
    }
  }
};
