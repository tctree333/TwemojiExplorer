<script lang="ts">
  import Card from './EmojiCard.svelte';
  import type { EmojiData } from '../lib/types';

  export let title: string;
  export let emojis: EmojiData[];
</script>

<style>
  section {
    isolation: isolate;

    margin: 0.5rem -2.5rem;
    padding: 0.75rem 2.5rem 4rem;

    border-bottom: 2px solid hsl(0deg, 0%, 90%);
  }
  h2 {
    font-size: 2.5rem;

    margin-bottom: 1.5rem;
  }
  div.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
    gap: 16px;
  }
</style>

<section>
  <h2>{title} ({emojis.length})</h2>
  <div class="grid">
    {#each emojis as emoji}
      <Card {emoji} />
    {/each}
  </div>
</section>
