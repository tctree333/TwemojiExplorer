<script context="module" lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  let currentActive: Writable<string> = writable(null);
</script>

<script lang="ts">
  import { onDestroy } from 'svelte';

  import type { EmojiData } from '../lib/types';

  export let emoji: EmojiData;

  let status: boolean = null;
  let timeoutHandle: NodeJS.Timeout;

  function fail() {
    status = false;
    timeoutHandle = setTimeout(() => {
      status = null;
    }, 5000);
  }

  function copySvg() {
    fetch(emoji.path)
      .then((res) => {
        if (res.ok) {
          res
            .text()
            .then((data) => {
              navigator.clipboard
                .writeText(data)
                .then(() => {
                  status = true;
                  timeoutHandle = setTimeout(() => {
                    status = null;
                  }, 5000);
                })
                .catch(fail);
            })
            .catch(fail);
        }
      })
      .catch(fail);
  }
  function copyCodepoint() {
    navigator.clipboard
      .writeText(emoji.codepoint)
      .then(() => {
        status = true;
        timeoutHandle = setTimeout(() => {
          status = null;
        }, 5000);
      })
      .catch(fail);
  }
  onDestroy(() => {
    clearTimeout(timeoutHandle);
  });

  function show() {
    currentActive.set(emoji.slug);
  }
</script>

<style>
  button.wrapper,
  div {
    isolation: isolate;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 148px;
    padding: 0.75rem;
    padding-top: 1rem;

    background-color: hsl(0, 0%, 99%);
    border: 1px solid hsl(0, 0%, 70%);
    border-radius: 0.5rem;
  }
  img {
    display: block;
    margin-bottom: 1rem;
  }
  p {
    font-size: 0.875rem;
  }
  div.actions {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: hsl(210, 90%, 90%);
    opacity: 90%;
  }
  button.button {
    margin-bottom: 0.5rem;
  }
  .button {
    display: block;
    width: 100%;

    padding: 0.375rem;

    font-size: 0.875rem;
    background-color: hsl(210, 70%, 70%);
    border-radius: 0.4rem;
    opacity: 99%;
  }
</style>

<button
  class="wrapper"
  style={status !== null ? `background-color: ${status ? 'hsl(110, 66%, 81%)' : 'hsl(0, 62%, 90%)'}` : ''}
  on:mouseover={show}
  on:mouseleave={() => {
    currentActive.set(null);
  }}
  on:click={show}>
  <a href="https://emojipedia.org/{emoji.slug.replace(/_/g, '-')}"
    ><img alt={emoji.emoji} src={emoji.path} width="42" height="42" loading="lazy" /></a>
  <p>{emoji.slug.replace(/_/g, ' ')}</p>
  {#if $currentActive === emoji.slug}
    <div class="actions">
      <button class="button" on:click={copySvg}>Copy SVG</button>
      <button class="button" on:click={copyCodepoint}>Copy Codepoint</button>
      <a class="button" href="https://emojipedia.org/{emoji.slug.replace(/_/g, '-')}">Emojipedia</a>
    </div>
  {/if}
</button>
