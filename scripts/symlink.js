// Create a symlink in "node_modules/ng-esm" to the root of this project.
// The example code will be able to import the latest code automatically.

const fs = require('fs');
const target = process.cwd();
const link = './node_modules/ng-esm';


fs.lstat(link, (err, stats) => {
  if (!err && stats.isSymbolicLink()) {
    console.log(`Already linked: "${link}" => "${target}"`);
    return;
  } else if (!err && stats.isDirectory()) {
    fs.rmdirSync(link);
    console.log(`Removed installed copy at "${link}"`);
  }

  fs.symlinkSync(target, link, 'junction');
  console.log(`Symlinked folders for development: "${link}" => "${target}"`);
});
