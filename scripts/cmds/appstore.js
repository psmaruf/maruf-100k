const itunes = require("searchitunes");
const { getStreamFromURL } = global.utils;

module.exports = {
    config: {
        name: "appstore",
        version: "1.3", // updated version
        author: "NTKhang",
        countDown: 5,
        role: 0,
        description: {
            vi: "Tìm app trên App Store",
            en: "Search app on App Store"
        },
        category: "software",
        guide: "{pn}: <keyword>\n- Example:\n{pn} PUBG",
        envConfig: {
            limitResult: 3
        }
    },

    langs: {
        vi: {
            missingKeyword: "Bạn chưa nhập từ khóa",
            noResult: "Không tìm thấy kết quả nào cho từ khóa %1"
        },
        en: {
            missingKeyword: "You haven't entered any keyword",
            noResult: "No result found for keyword %1"
        }
    },

    onStart: async function ({ message, args, commandName, envCommands, getLang }) {
        if (!args[0]) {
            return message.reply(getLang("missingKeyword"));
        }

        let results = [];
        try {
            results = (await itunes({
                entity: "software",
                country: "VN",
                term: args.join(" "),
                limit: envCommands[commandName].limitResult
            })).results;
        } catch (err) {
            console.error(err);
            return message.reply(getLang("noResult", args.join(" ")));
        }

        if (results.length === 0) {
            return message.reply(getLang("noResult", args.join(" ")));
        }

        let msg = "";
        const pendingImages = [];

        for (const result of results) {
            // Fallback if no rating
            const rating = result.averageUserRating || 0;
            msg += `\n\n- ${result.trackCensoredName} by ${result.artistName}, ${result.formattedPrice} and rated ${"🌟".repeat(Math.round(rating))} (${rating.toFixed(1)}/5)`
                + `\n- ${result.trackViewUrl}`;

            // Add image stream if exists
            const artworkUrl = result.artworkUrl512 || result.artworkUrl100 || result.artworkUrl60;
            if (artworkUrl) {
                pendingImages.push(getStreamFromURL(artworkUrl));
            }
        }

        message.reply({
            body: msg,
            attachment: pendingImages.length > 0 ? await Promise.all(pendingImages) : undefined
        });
    }
};
