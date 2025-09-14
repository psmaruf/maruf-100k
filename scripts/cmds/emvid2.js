module.exports = {
  config: {
    name: "emvid2",
    version: "1.0",
    author: "Goku",
    countDown: 5,
    role: 0,
    shortDescription: "triggered by 🥵",
    longDescription: "sends Fahad video when 🥵 emoji is sent",
    category: "no prefix",
  }, 

  onStart: async function(){}, 

  onChat: async function({ event, message }) {
    if (event.body && event.body.includes("🥵")) {
      const video = "https://files.catbox.moe/1ffh5y.mp4";

      return message.reply({
        body: " PS MARUF GAMING🎬",
        attachment: await global.utils.getStreamFromURL(video)
      });
    }
  }
}
