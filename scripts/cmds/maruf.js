module.exports = {
  config: {
    name: "maruf edit",
    version: "1.0",
    author: "Badhon",
    category: "cuties",
    role: 0,
    usePrefix: true,
    description: "Send a random edit video",
    usage: "Just type {p}edit and the bot will send a random edit video",
    cooldown: 2,
  },
  
  onStart: async function({ message }) {
    try {
      const videos = [
        "https://files.catbox.moe/h8ek6g.mp4",
        "https://files.catbox.moe/zlguk3.mp4",
        "https://files.catbox.moe/h4fdhe.mp4",
        "",
        "",
        "https://files.catbox.moe/bs5obz.mp4"
      ];
      
 
      const randomIndex = Math.floor(Math.random() * videos.length);
      const randomVideo = videos[randomIndex];
      
   
      message.reply({
        body: "💃 COME BABY'S 🥵!",
        attachment: await global.utils.getStreamFromURL(randomVideo)
      });
      
    } catch (error) {
      console.error("Error in dance command:", error);
      message.reply("❌ An error occurred while sending the dance video. Please try again later.");
    }
  }
};
