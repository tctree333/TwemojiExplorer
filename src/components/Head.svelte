<script lang="ts">
  import Favicons from './Favicons.svelte';

  interface PageImage {
    url: string;
    type: string;
    alt: string;
  }
  export let title: string;
  export let description: string;
  export let index = true;
  export let pageImage: PageImage | undefined = undefined;
  export let canonical: string | undefined = undefined;

  export let path: string = undefined;

  import elderConfig from '../../elder.config';
  const { origin: host } = elderConfig;

  if (canonical === undefined && path !== undefined) {
    canonical = fullUrl(path);
  }

  function fullUrl(value: string) {
    let root = 'https://' + host;
    if (!value.startsWith(root)) {
      value = root + (value.startsWith('/') ? '' : '/') + value;
    }
    value = value.endsWith('index.html') ? value.substr(0, value.length - 10) : value;
    if (value === root || value === root + '/') {
      value = root;
    } else {
      value = value.endsWith('/') ? value : value + '/';
    }
    return value;
  }

  if (pageImage) {
    pageImage.url = fullUrl(pageImage.url);
  }
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>{title}</title>
  <meta name="description" content={description} />

  {#if canonical}
    <link rel="canonical" href={canonical} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:url" content={canonical} />
  {/if}

  <!-- Allow search engines to crawl certain pages -->
  {#if index === false}
    <meta name="robots" content="none" />
    <meta name="googlebot" content="none" />
  {:else}
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
  {/if}

  <!-- Social cards (twitter, open graph) -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />

  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:domain" content="funwithmeth.com" />

  {#if pageImage}
    <meta name="twitter:card" content="summary_large_image" />

    <meta property="og:image" content={pageImage.url} />
    <meta property="og:image:type" content={pageImage.type} />
    <meta property="og:image:alt" content={pageImage.alt} />

    <meta name="twitter:image" content={pageImage.url} />
    <meta name="twitter:image:alt" content={pageImage.alt} />
  {/if}

  <!-- Other assorted tags -->
  <meta name="twitter:dnt" content="on" />
  <meta name="pinterest" content="nopin" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />

  <Favicons />
  <script async defer data-domain="twemoji.tomichen.com" src="https://plausible.io/js/plausible.js"></script>
</svelte:head>
