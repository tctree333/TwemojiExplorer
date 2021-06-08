const emojiData = require('unicode-emoji-json/data-by-group.json');
const emojiKeywords = require('emojilib');
const twemoji = require('twemoji-parser');

module.exports = {
  all: () => [{ slug: '/' }],
  permalink: ({ request }) => request.slug,
  data: () => {
    const fullEmojiData = [];
    for (const group in emojiData) {
      let fullEmojiDataEmojis = [];
      emojiData[group].forEach((obj) => {
        const codepoint = twemoji
          .parse(obj.emoji, { buildUrl: (codepoint) => codepoint })
          // see https://github.com/twitter/twemoji/issues/405
          // temp workaround
          .map((obj) => obj.url)
          .filter((str) => !!str)
          .join('-200d-');

        fullEmojiDataEmojis.push({
          emoji: obj.emoji,
          slug: obj.slug,
          codepoint: codepoint.replace(/-/g, ' '),
          path: `/twemoji/svg/${codepoint}.svg`,
          keywords: JSON.stringify(emojiKeywords[obj.emoji].concat([codepoint]))
            .replace(/[\\\[\]'"]/g, '')
            .replace(/[,_]/g, ' '),
        });
      });

      fullEmojiData.push({
        group,
        emojis: fullEmojiDataEmojis,
      });
    }
    return { data: fullEmojiData };
  },
};
