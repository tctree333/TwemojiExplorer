<script lang="ts">
  import Card from './EmojiCard.svelte';
  import Grid from './Grid.svelte';
  import { displayItems } from './SearchBar.svelte';
  import type { EmojiData } from '../lib/types';

  export let title: string;
  export let emojis: EmojiData[];
</script>

<style>
  section {
    margin: 0.5rem -2.5rem;
    padding: 0.75rem 2.5rem 4rem;

    border-bottom: 2px solid hsl(0deg, 0%, 90%);
  }
  h2 {
    font-size: 2.5rem;

    margin-bottom: 1.5rem;
  }
</style>

<section>
  <h2>{title}</h2>
  <Grid>
    {#each emojis as emoji}
      {#if !$displayItems || $displayItems[emoji.emoji] !== undefined}
        <Card {emoji} />
      {/if}
    {/each}
  </Grid>
</section>
