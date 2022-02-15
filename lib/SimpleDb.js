const fs = require('fs/promises');
const { serialize } = require('v8');
const path = require('path');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  /**
   *
   * @param {number} id
   * @returns {Promise} an object associated with the provided ID or an error.
   */
  getById(id) {
    return fs
      .readFile(`${this.dirPath}/${id}.json`)
      .then((file) => JSON.parse(file))
      .catch((err) => {
        if (err.code === 'ENOENT') throw new Error('Not found');
        throw err;
      });
  }

  /**
   *
   * @param {Object} obj
   * @returns {Promise} the saved object or an error.
   */
  save(obj) {
    obj.id = Math.floor(Math.random() * 100000);
    const serializedObj = JSON.stringify(obj);
    const newPath = path.join(this.dirPath, `${obj.id}.json`);
    return fs.writeFile(newPath, serializedObj).then(() => obj.id);
  }
}

module.exports = SimpleDb;
