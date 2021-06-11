module.exports = {
  all: () => [{ slug: '/404.html' }],
  permalink: ({ request }) => request.slug,
  data: () => {},
};
