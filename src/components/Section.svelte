<script lang="ts">
  import Card from './EmojiCard.svelte';
  import Grid from './Grid.svelte';
  import { displayItems } from './SearchBar.svelte';
  import type { EmojiData } from '../lib/types';

  export let title: string;
  export let emojis: EmojiData[];

  $: emojilist = !$displayItems ? emojis : emojis.filter((emoji) => $displayItems[emoji.emoji] !== undefined);
</script>

<style>
  section {
    isolation: isolate;

    margin: 0.5rem -2.5rem;
    padding: 0.75rem 2.5rem 4rem;

    border-bottom: 2px solid hsl(0, 0%, 90%);
  }
  h2 {
    font-size: 2.5rem;

    margin-bottom: 1.5rem;
  }
</style>

{#if emojilist.length > 0}
  <section>
    <h2>{title} ({emojilist.length})</h2>
    <Grid>
      {#each emojilist as emoji}
        <Card {emoji} />
      {/each}
    </Grid>
  </section>
{/if}
