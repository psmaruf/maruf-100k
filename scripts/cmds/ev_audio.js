module.exports = {
  config: {
    name: "ev_audio",
    author: "BADHON",
    role: "auto",
    description: "Sends an audio attachment when someone mentions '@everyone' or 'everyone' in the chat",
    version: "1.0.0"
  },
  onStart: async function() {}, 
  onChat: async function({ api, event, args, message }) {
    const lowerCaseBody = event.body.toLowerCase();
    if (lowerCaseBody.includes("@everyone") || lowerCaseBody.includes("everyone")) {
      try {
        await message.reply({
          body: " ", 
          attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/hap9wr.mp3")
        });
      } catch (error) {
        console.error("Error sending audio:", error);
      }
    }
  }
};