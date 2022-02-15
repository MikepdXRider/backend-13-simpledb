const fs = require('fs/promises');
// const path = require('path');

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
}

module.exports = SimpleDb;
