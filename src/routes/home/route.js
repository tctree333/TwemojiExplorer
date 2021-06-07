const emojiData = require('unicode-emoji-json/data-by-group.json');
const emojiKeywords = require('emojilib');
const twemoji = require('twemoji-parser');

module.exports = {
  all: () => [{ slug: '/' }],
  permalink: ({ request }) => request.slug,
  data: () => {
    const fullEmojiData = [];
    const searchData = [];
    for (const group in emojiData) {
      fullEmojiData.push({
        group,
        emojis: emojiData[group].map((obj) => {
          const codepoint = twemoji
            .parse(obj.emoji, { buildUrl: (codepoint) => codepoint })
            // see https://github.com/twitter/twemoji/issues/405
            // temp workaround
            .map((obj) => obj.url)
            .filter((str) => !!str)
            .join('-200d-');
          return {
            emoji: obj.emoji,
            slug: obj.slug,
            codepoint: codepoint.replaceAll('-', ' '),
            path: `/twemoji/svg/${codepoint}.svg`,
          };
        }),
      });
    }
    for (const emoji in emojiKeywords) {
      searchData.push({ emoji: emoji, keywords: emojiKeywords[emoji] });
    }
    return {
      fullEmojiData,
      searchData,
    };
  },
};
