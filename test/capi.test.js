const Capi = require('../src/capi');

(async () => {
  const me = new Capi('lucagez');
  const data = await me.get();
  console.log(data);
})();
