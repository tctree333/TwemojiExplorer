<script lang="ts">
  import Card from './EmojiCard.svelte';
  import type { EmojiData } from '../lib/types';

  export let title: string;
  export let emojis: EmojiData[];

  let showDefault = 23;
  let showAll = false;

  $: {
    if (emojis) {
      showAll = false;
    }
  }
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
  button {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 148px;
    padding: 0.75rem;

    background-color: hsl(184, 88%, 90%);
    border: 1px solid hsl(213, 45%, 77%);
    border-radius: 0.5rem;

    font-size: 1.125rem;
  }
  svg {
    display: inline-block;
    margin-left: 0.2em;
  }
</style>

<section>
  <h2>{title} ({emojis.length})</h2>
  <div class="grid">
    {#each emojis.slice(0, showDefault) as emoji}
      <Card {emoji} />
    {/each}
    {#if emojis.slice(showDefault).length > 0}
      {#if showAll}
        {#each emojis.slice(showDefault) as emoji}
          <Card {emoji} />
        {/each}
      {:else}
        <button
          on:click={() => {
            showAll = true;
          }}>
          <p>Show All</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      {/if}
    {/if}
  </div>
</section>
