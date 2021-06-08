<script context="module" lang="ts">
  import type { Writable } from 'svelte/store';
  import { writable } from 'svelte/store';
  export const displayItems: Writable<GroupedEmojiData[]> = writable(null);
</script>

<script lang="ts">
  import type { EmojiData, GroupedEmojiData } from 'src/lib/types';
  import FlexSearch from 'flexsearch';
  import type { Index } from 'flexsearch';

  export let searchData: GroupedEmojiData[];

  const index: Record<string, Index<EmojiData>> = {};
  searchData.forEach(({ group, emojis }) => {
    (
      index[group] ||
      (index[group] = FlexSearch.create({
        profile: 'match',
        doc: {
          id: 'emoji',
          field: 'keywords',
        },
      }))
    ).add(emojis);
  });

  function search(query: string, cb: (res: GroupedEmojiData[]) => void) {
    const promises = Object.keys(index).map(
      (key) =>
        new Promise<GroupedEmojiData>((resolve) => {
          index[key].search({ query }, (result) => {
            resolve({ group: key, emojis: result });
          });
        }),
    );
    Promise.all(promises).then((data) => {
      cb(data.filter((obj) => obj.emojis.length > 0));
    });
  }

  let debounceTimeout: NodeJS.Timeout;
  let searchstring: string = '';
  function setResult(result: GroupedEmojiData[]) {
    displayItems.set(result);
  }

  function handleInput() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchstring ? search(searchstring, setResult) : setResult(null);
    }, 25);
  }
</script>

<style>
  div.wrapper {
    isolation: isolate;
    z-index: 10;

    position: sticky;
    top: 0;
    background-color: hsl(0, 0%, 100%);

    margin-bottom: 1rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  div.label-wrapper {
    max-width: 88rem;
    width: 100%;
    margin: 0 auto;
    padding: 0.75rem 2rem;
  }
  label {
    display: flex;
    align-items: center;
  }

  p {
    font-size: 1.25rem;
  }
  input {
    width: 100%;
    padding: 0.75rem 0.5rem;

    font-size: 1.5rem;

    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  input:focus-visible {
    box-shadow: 4px 0 0 0 6px hsl(210, 70%, 70%);
  }
</style>

<div class="wrapper">
  <div class="label-wrapper">
    <label>
      <p class="sr-only">Search Emojis!</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="28"
        width="28"
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="text" bind:value={searchstring} on:input={handleInput} placeholder="Search Emojis!" />
    </label>
  </div>
</div>
