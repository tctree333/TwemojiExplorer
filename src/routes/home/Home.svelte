<script lang="ts">
  import Header from '../../components/Header.svelte';
  import Head from '../../components/Head.svelte';
  import SearchBar from '../../components/SearchBar.svelte';
  import Section from '../../components/Section.svelte';
  import type { EmojiData, SearchEmojiData } from '../../lib/types';

  export let data: {
    fullEmojiData: {
      group: string;
      emojis: EmojiData[];
    }[];
    searchData: SearchEmojiData[];
  };
</script>

<style>
  div {
    max-width: 88rem;
    padding: 0 2rem;
    margin: 0 auto;
  }
</style>

<Head
  title="Twemoji Explorer"
  description="Twemoji Explorer lets you explore Twitter's Twemoji, for use in other projects."
  path="/" />

<Header />

<main>
  <SearchBar hydrate-client={{ searchData: data.searchData }} />

  <div>
    {#each data.fullEmojiData as group}
      <Section hydrate-client={{ title: group.group, emojis: group.emojis }} />
    {/each}
  </div>
</main>
