const assert = require('assert');
const Capi = require('../dist/capi');

const isUser = async (name) => {
  let data;
  it('should be an object', async () => {
    const me = new Capi(name, 5);
    data = await me.get();
    assert(typeof (data), 'object');
  });

  it('should be made of objects with exactly 4 properties', async () => {
    data.forEach((e) => {
      const { length } = Object.keys(e);
      assert.notEqual(length, 0);
      assert.equal(length, 4);
    });
  });

  it('views, hearts, comments should always be numbers', async () => {
    data.forEach((e) => {
      assert.equal(typeof (e.views), 'number');
      assert.equal(typeof (e.hearts), 'number');
      assert.equal(typeof (e.comments), 'number');
    });
  });

  it('title should always be a non-empty string', async () => {
    data.forEach((e) => {
      assert.equal(typeof (e.title), 'string');
      assert.notEqual(e.title.length, 0);
    });
  });
};

describe('a user', async () => {
  const users = [
    'lucagez',
    'ge1doot',
    'chriscoyier',
    'Mamboleoo',
    'chrisgannon',
    'ainalem',
    'jcoulterdesign',
    'ste-vg',
  ];

  users.forEach(isUser);
});
