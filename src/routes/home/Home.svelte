<script lang="ts">
  import Head from '../../components/Head.svelte';
  import Main from '../../components/Main.svelte';
  import type { GroupedEmojiData } from '../../lib/types';

  export let data: { data: GroupedEmojiData[] };
</script>

<Head
  title="Twemoji Explorer"
  description="Twemoji Explorer lets you explore Twitter's Twemoji, for use in other projects."
  path="/" />

<Main hydrate-client={{ data: data.data }} />
