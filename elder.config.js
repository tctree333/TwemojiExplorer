module.exports = {
  origin: 'twemoji.tomichen.com', // TODO: update this.
  lang: 'en',
  srcDir: 'src',
  distDir: 'public',
  rootDir: process.cwd(),
  build: {},
  prefix: '',
  server: {},
  debug: {
    stacks: false,
    hooks: false,
    performance: false,
    build: false,
    automagic: false,
  },
  hooks: {
    // disable: ['elderWriteHtmlFileToPublic'], // this is used to disable internal hooks. Uncomment this to disabled writing your files on build.
  },
  plugins: {
    '@elderjs/plugin-browser-reload': {
      // this reloads your browser when nodemon restarts your server.
      port: 8080,
    },
    '@elderjs/plugin-images': {
      folders: [
        {
          src: '/src/assets/images/*', // glob of where your original images are. Relative to rootDir/process.cwd() defined in your elder.config.js. Careful with **.
          output: '/images/', // where files should be put within the distDir defined in your elder.config.js.
        },
      ],
    },
    // '@elderjs/plugin-seo-check': {
    //   display: ['errors', 'warnings'], // If the errors are too verbose remove 'warnings'
    //   //writeLocation: './report.json', // if you want to write a report of errors
    // },
  },
  shortcodes: { closePattern: '}}', openPattern: '{{' },
};
