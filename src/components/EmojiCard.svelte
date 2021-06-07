<script lang="ts">
  import type { EmojiData } from '../lib/types';

  export let emoji: EmojiData;
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    height: 132px;
    padding: 0.5rem;

    background-color: hsl(0deg, 0%, 85%);
    border-radius: 0.5rem;
  }
  img {
    display: block;
  }
</style>

<div>
  <a href="https://emojipedia.org/{emoji.slug.replace(/_/g, '-')}"
    ><img alt={emoji.emoji} src={emoji.path} width="32" height="32" /></a>
  <p>{emoji.codepoint}</p>
</div>
