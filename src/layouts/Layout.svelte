<script lang="ts">
  import Header from '../components/Header.svelte';
  import '../assets/reset.css';
  export let templateHtml: string;
</script>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 4rem 1rem;
    width: 100%;
    background-color: hsl(0, 0%, 95%);

    font-size: 1.25rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
  a {
    text-decoration: underline;
  }
  :global(body) {
    display: flex;
    flex-direction: column;
  }
  main {
    flex: 1;
  }
</style>

<Header />

<main>
  {@html templateHtml}
</main>

<footer>
  <p>A web project by <a href="https://tomichen.com">Tomi Chen.</a></p>
  <p>Open Source on <a href="https://github.com/tctree333/TwemojiExplorer">GitHub</a></p>
</footer>
