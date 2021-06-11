<script lang="ts">
  import Head from '../../components/Head.svelte';
  export let helpers;
</script>

<style>
  div {
    min-height: 100%;
    max-width: 88rem;
    padding: 4rem 2rem;
    margin: 0 auto;
  }
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.5rem;
    margin-bottom: 4rem;
  }
  a {
    text-decoration: underline;
  }
  div :global(picture.picture img) {
    display: block;
    width: 100%;
    max-width: 48rem;
    margin: 0 auto;
    border-radius: 4px;
  }
</style>

<Head
  title="404 | Twemoji Explorer"
  description="Twemoji Explorer lets you explore Twitter's Twemoji, for use in other projects."
  index={false} />

<div>
  <h2>404: Not Found</h2>
  <p>The requested page was not found. Maybe you want to <a href="/">return home</a>?</p>
  {@html helpers.images.picture('/images/red-panda.jpg', {
    class: 'picture',
    alt: 'a red panda on a branch',
  })}
</div>
