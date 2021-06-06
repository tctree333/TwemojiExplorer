const emojiData = require('unicode-emoji-json/data-by-group.json');
const emojiKeywords = require('emojilib');

module.exports = {
  all: () => [{ slug: '/' }],
  permalink: ({ request }) => request.slug,
  data: () => {
    const fullEmojiData = [];
    const searchData = [];
    for (const group in emojiData) {
      fullEmojiData.push({ group, emojis: emojiData[group] });
    }
    for (const emoji in emojiKeywords) {
      searchData.push({ emoji, keywords: emojiKeywords[emoji] });
    }
    return {
      fullEmojiData,
      searchData,
    };
  },
};
