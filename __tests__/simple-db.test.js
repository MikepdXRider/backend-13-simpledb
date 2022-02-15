const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/SimpleDb.js');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {
  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('calls getById and returns the correct object', async () => {
    // declare new instance of DB
    const testDb = new SimpleDb(TEST_DIR);
    // creates a new path for our file
    const newPath = path.join(TEST_DIR, '12345.json');
    // writes a new file using the declared path.
    await fs.writeFile(newPath, JSON.stringify({ test_prop: 'testValue' }));

    // attempts to retrieve the new file.
    const actual = await testDb.getById(12345);

    // assert
    expect(actual.test_prop).toEqual('testValue');
  });

  it('calls getById with an invalid id, returns the expected error', async () => {
    const testDb = new SimpleDb(TEST_DIR);
    try {
      await testDb.getById('52143');
    } catch (err) {
      expect(err.message).toEqual('Not found');
    }
  });
});
