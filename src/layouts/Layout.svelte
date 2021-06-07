<script lang="ts">
  import '../assets/reset.css';
  export let templateHtml: string;
</script>

<style>
  footer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 4rem 1rem;
    width: 100%;

    background-color: hsl(0deg 0% 90%);
  }
  footer a {
    text-decoration: underline;
  }
</style>

{@html templateHtml}

<footer>
  <p>A web project by <a href="https://tomichen.com">Tomi Chen.</a></p>
</footer>
