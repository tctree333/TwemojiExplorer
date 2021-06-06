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
    margin-bottom: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;

    border-top: 2px solid hsl(0deg, 0%, 90%);
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
