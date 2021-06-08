<script lang="ts">
  import Header from '../../components/Header.svelte';
  import Head from '../../components/Head.svelte';
  import Main from '../../components/Main.svelte';
  import type { EmojiData, SearchEmojiData } from '../../lib/types';

  export let data: {
    fullEmojiData: {
      group: string;
      emojis: EmojiData[];
    }[];
    searchData: SearchEmojiData[];
  };
</script>

<Head
  title="Twemoji Explorer"
  description="Twemoji Explorer lets you explore Twitter's Twemoji, for use in other projects."
  path="/" />

<Header />

<Main hydrate-client={{ data }} />
