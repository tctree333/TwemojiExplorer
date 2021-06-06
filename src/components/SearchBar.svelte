<script context="module" lang="ts">
  import type { Writable } from 'svelte/store';
  import { writable } from 'svelte/store';
  export const displayItems: Writable<{ [key: string]: boolean }> = writable(null);
</script>

<script lang="ts">
  import type { SearchEmojiData } from 'src/lib/types';
  import FlexSearch from 'flexsearch';

  export let searchData: SearchEmojiData[];

  const index = FlexSearch.create<{ emoji: string; keywords: string }>({
    profile: 'match',
    doc: {
      id: 'emoji',
      field: 'keywords',
    },
  });
  index.add(
    searchData.map((v) => ({
      ...v,
      keywords: JSON.stringify(v.keywords)
        .replace(/[\\\[\]'"]/g, '')
        .replace(/[,_]/g, ' '),
    })),
  );

  let searchstring: string = '';
  function setResult(result: { [key: string]: boolean }) {
    displayItems.set(result);
  }

  $: searchstring
    ? index.search({ query: searchstring }, (res) => {
        console.log(res);
        setResult(
          res.reduce((acc, curr) => {
            acc[curr.emoji] = true;
            return acc;
          }, {}),
        );
      })
    : setResult(null);
</script>

<input type="text" bind:value={searchstring} />
