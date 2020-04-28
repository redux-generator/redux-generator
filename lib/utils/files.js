const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  createIfNotExist: (filePath) => {
    const exist = fs.existsSync(filePath);
    if (!exist) fs.mkdirSync(filePath);
  },

  writeOrRewrite: (fileExist, fullPath, content) => {
    if (fileExist) {
      fs.writeFileSync(fullPath, content);
      return fullPath;
    }
    fs.writeFileSync(fullPath, content, { flag: 'wx' });
    return fullPath;
  },
};
