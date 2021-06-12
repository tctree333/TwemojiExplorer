const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const hooks = [
  {
    hook: 'bootstrap',
    name: 'copyAssetsToPublic',
    description:
      'Copies ./assets/ to the "distDir" defined in the elder.config.js. This function helps support the live reload process.',
    run: ({ settings }) => {
      // note that this function doesn't manipulate any props or return anything.
      // It is just executed on the 'bootstrap' hook which runs once when Elder.js is starting.

      // copy assets folder to public destination
      glob.sync(path.resolve(settings.rootDir, './src/assets/**/*')).forEach((file) => {
        const parsed = path.parse(file);
        // Only write the file/folder structure if it has an extension
        if (parsed.ext && parsed.ext.length > 0) {
          const relativeToAssetsFolder = path.relative(path.join(settings.rootDir, './src/assets'), file);
          const outputPath = path.resolve(settings.distDir, relativeToAssetsFolder);
          fs.ensureDirSync(path.parse(outputPath).dir);
          fs.outputFileSync(outputPath, fs.readFileSync(file));
        }
      });
    },
  },
  {
    hook: 'buildComplete',
    name: 'rename 404 file',
    description: 'renames the 404 file in /404/index.html to /404.html',
    run: () => {
      fs.renameSync('public/404/index.html', 'public/404.html');
      fs.rmdirSync('public/404');
    },
  },
];
module.exports = hooks;
