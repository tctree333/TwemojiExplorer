<script lang="ts">
  import type { EmojiData } from '../lib/types';

  export let emoji: EmojiData;
</script>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 132px;
    background-color: hsl(0deg, 0%, 80%);
    border-radius: 0.5rem;
  }
  a {
    font-size: 2rem;
  }
</style>

<div>
  <a href="https://emojipedia.org/{emoji.slug.replace(/_/g, '-')}">{emoji.emoji}</a>
</div>
