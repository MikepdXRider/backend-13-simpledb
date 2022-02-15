const fs = require('fs/promises');
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
  async getById(id) {
    try {
      const file = await fs.readFile(`${this.dirPath}/${id}.json`);
      return JSON.parse(file);
    } catch (err) {
      if (err.code === 'ENOENT') throw new Error('Not found');
      throw err;
    }
    // return fs
    //   .readFile(`${this.dirPath}/${id}.json`)
    //   .then((file) => JSON.parse(file))
    //   .catch((err) => {
    //     if (err.code === 'ENOENT') throw new Error('Not found');
    //     throw err;
    //   });
  }

  /**
   *
   * @param {Object} obj
   * @returns {Promise} the saved object or an error.
   */
  async save(obj) {
    const id = Math.floor(Math.random() * 100000);
    const serializedObj = JSON.stringify(obj);
    const newPath = path.join(this.dirPath, `${id}.json`);
    await fs.writeFile(newPath, serializedObj);
    return id;
    // const id = Math.floor(Math.random() * 100000);
    // const serializedObj = JSON.stringify(obj);
    // const newPath = path.join(this.dirPath, `${id}.json`);
    // return fs.writeFile(newPath, serializedObj).then(() => id);
  }

  async getAll() {
    const currentDirectory = await fs.readdir(this.dirPath);
    return await Promise.all(
      currentDirectory.map(
        async (fileName) => await this.getById(fileName.split('.')[0])
      )
    );
    // return fs
    //   .readdir(this.dirPath)
    //   .then((dirContents) =>
    //     Promise.all(
    //       dirContents.map((fileName) => this.getById(fileName.split('.')[0]))
    //     )
    //   );
  }
}

module.exports = SimpleDb;
