export interface EmojiData {
  emoji: string;
  codepoint: string;
  path: string;
  // skin_tone_support: boolean;
  // name: string;
  slug: string;
  // unicode_version: string;
  // emoji_version: string;
  // skin_tone_support_unicode_version?: string;
  keywords: string;
}

export type GroupedEmojiData = {
  group: string;
  emojis: EmojiData[];
};

// export interface SearchEmojiData {
//   [key: string]: {
//     emoji: string;
//     keywords: string;
//   }[];
// }

// export type SearchEmojiResult = { group: string; emojis: { [key: string]: boolean } }[];
