const { getTime } = global.utils;
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "leave",
    version: "2.2",
    author: "Badhon",
    category: "events",
    description: "Handles group leave/kick events with custom messages",
    dependencies: {
      "fs-extra": "",
      "path": "",
      "moment-timezone": "",
      "axios": "",
      "chalk": "",
      "child_process": "",
      "crypto": "",
      "form-data": "",
      "request": ""
    }
  },

  onStart: async ({ threadsData, message, event, api, usersData }) => {
    try {
      if (event.logMessageType !== "log:subscribed") return;

      const { threadID } = event;
      const threadData = await threadsData.get(threadID);
      if (!threadData.settings?.sendLeaveMessage) return;

      const { leftParticipantFbId, author } = event.logMessageData;
      if (leftParticipantFbId === api.getCurrentUserID()) return;

      const userName = await usersData.getName(leftParticipantFbId);
      const kickerName = await usersData.getName(author);
      const isKicked = leftParticipantFbId !== author;
      const threadInfo = await api.getThreadInfo(threadID);
      const groupName = threadInfo.threadName || "this group";

     
      const bdTime = moment().tz('Asia/Dhaka').format('MMMM Do YYYY, h:mm:ss a');

      
      const specialAdmins = ["61557409693409", "61571421696077"];
      const isSpecialAdmin = specialAdmins.includes(author);

      if (isKicked) {
        if (isSpecialAdmin) {
          
          const customKickMessages = [
            `👢 "${userName}" কে বিদায়! বাঁধন বসের লাথি খেয়ে চাঁদে পৌঁছাল!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `💥 হাহাহা! "${userName}" রিমুভড! বাঁধন বসের মুড খারাপ ছিল!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `🗑️ "${userName}" কে ডাস্টবিনে ফেলা হলো! বাঁধন বসের অর্ডার!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `👋 "${userName}" বাই-বাই! বাঁধন বস তোর নাম শুনেই রেগে গিয়েছিল!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `🚀 "${userName}" কে কিক দিয়ে মহাকাশে পাঠানো হলো!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `😤 "${userName}" তোর ভাগ্য খারাপ! বাঁধন বস আজকে রেগে আগুন!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `💩 "${userName}" তুই এখন বাঁধন বসের ব্ল্যাকলিস্টে!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `☠️ "${userName}" এর জন্য গ্রুপে নো এন্ট্রি! বাঁধন বসের হুকুম!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `😂 "${userName}" ভাই, বাঁধন বসের মার খাওয়ার ভয়ে পালালা নাকি?\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `🏃‍♂️ ওই দেখ! "${userName}" এর স্পিড দেখ! বাঁধন বস আসছেন!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `😆 "${userName}" রে বাবা! এত ভয়? বাঁধন বসের ছায়া দেখেই পালালি!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `🤣 "${userName}" তুই পালাস কেন? বাঁধন বস তো শুধু তোর প্রোফাইল পিক দেখছিল!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `🎯 "${userName}" কে টার্গেট করে মার! বাঁধন বসের একশট!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `🍌 "${userName}" এর অবস্থা এখন পাকানো কলা! বাঁধন বসের সামনে!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
            `👊 "${userName}" এর উপর বাঁধন বসের মুষ্টি এসে পড়েছে!\n\nGroup: ${groupName}\nTime: ${bdTime}`
          ];

          const randomMessage = customKickMessages[Math.floor(Math.random() * customKickMessages.length)];
          const formattedMessage = `╭───────────╮\n${randomMessage}\n╰───────────╯`;

          await message.send({
            body: formattedMessage,
            mentions: [{ tag: userName, id: leftParticipantFbId }]
          });
        } else {
          
          await message.send({
            body: `User ${userName} was kicked from ${groupName} by ${kickerName}.\nTime: ${bdTime}`,
            mentions: [
              { tag: userName, id: leftParticipantFbId },
              { tag: kickerName, id: author }
            ]
          });
        }
      } else {
        
        const customLeaveMessages = [
          `😂 "${userName}" ভাই, বাঁধন বসের মার খাওয়ার ভয়ে পালালা নাকি?\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `🏃‍♂️ ওই দেখ! "${userName}" এর স্পিড দেখ! বাঁধন বস আসছেন!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `😆 "${userName}" রে বাবা! এত ভয়? বাঁধন বসের ছায়া দেখেই পালালি!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `🤣 "${userName}" তুই পালাস কেন? বাঁধন বস তো শুধু তোর প্রোফাইল পিক দেখছিল!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `😜 "${userName}" গ্রুপ ছেড়ে পালালে? বাঁধন বসের খাবারের লিস্টে ছিলি তুই!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `🐦 "${userName}" পাখির মতো উড়ে গেল! বাঁধন বসের হাসি দেখে ভয় পেয়ে!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `👀 "${userName}" তোর অবস্থা খারাপ! বাঁধন বস তোর দিকে তাকিয়ে আছে!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `🍌 "${userName}" ভাই, বাঁধন বসের সামনে কলা হয়ে গেলি নাকি?\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `👻 "${userName}" ভূত হয়ে গেল! বাঁধন বসের ভয়ে!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `🏎️ "${userName}" এর স্পিড লিমিট ছাড়িয়ে গেছে! বাঁধন বস পিছনে!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `🪂 "${userName}" প্যারাসুট নিয়ে লাফ দিল! বাঁধন বসের গ্রুপ থেকে!\n\nGroup: ${groupName}\nTime: ${bdTime}`,
          `🌪️ "${userName}" কে ঘূর্ণিঝড়ে উড়িয়ে নিল! বাঁধন বসের রাগে!\n\nGroup: ${groupName}\nTime: ${bdTime}`
        ];

        const randomMessage = customLeaveMessages[Math.floor(Math.random() * customLeaveMessages.length)];
        const formattedMessage = `╭───────────╮\n${randomMessage}\n╰───────────╯`;

        await message.send({
          body: formattedMessage,
          mentions: [{ tag: userName, id: leftParticipantFbId }]
        });
      }
    } catch (error) {
      console.error("Error in leave event handler:", error);
    }
  },

  onChat: async ({ event, message, getLang, threadsData, usersData, api }) => {
    
  },

  onReply: async ({ event, message, Reply, getLang, threadsData, usersData, api }) => {
    
  }
};
