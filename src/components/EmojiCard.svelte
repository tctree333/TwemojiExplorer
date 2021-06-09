<script context="module" lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  let currentActive: Writable<string> = writable(null);
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import type { EmojiData } from '../lib/types';

  export let emoji: EmojiData;

  let noJSAnchor: HTMLAnchorElement;
  onMount(() => {
    noJSAnchor.tabIndex = -1;
  });

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

  function showActions() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      currentActive.set(emoji.slug);
    }
  }
  function hideActions() {
    currentActive.set(null);
  }
  function click() {
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

    background-color: hsla(210, 90%, 90%, 70%);
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
    opacity: 80%;
  }
  button,
  .button {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  button:focus-visible,
  .button:focus-visible {
    box-shadow: 0 0 0 4px hsl(213, 89%, 47%);
  }
</style>

<button
  class="wrapper"
  style={status !== null ? `background-color: ${status ? 'hsl(110, 66%, 81%)' : 'hsl(0, 62%, 90%)'}` : ''}
  on:mouseover={showActions}
  on:mouseleave={hideActions}
  on:click={click}>
  <a
    bind:this={noJSAnchor}
    on:click={(e) => {
      e.preventDefault();
    }}
    target="_blank"
    rel="noopener"
    href="https://emojipedia.org/{emoji.slug.replace(/_/g, '-')}"
    ><img alt={emoji.emoji} src={emoji.path} width="42" height="42" loading="lazy" /></a>
  <p>{emoji.slug.replace(/_/g, ' ')}</p>
  {#if $currentActive === emoji.slug}
    <div class="actions">
      <button class="button" on:click={copySvg}>Copy SVG</button>
      <button class="button" on:click={copyCodepoint}>Copy Codepoint</button>
      <a target="_blank" rel="noopener" class="button" href="https://emojipedia.org/{emoji.slug.replace(/_/g, '-')}"
        >Emojipedia</a>
    </div>
  {/if}
</button>
