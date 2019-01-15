const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { error } = console;

class Capi {
  constructor(user, max, order) {
    this.user = user;
    this.max = max || 20;
    this.order = order === 'popular' || order === 'public' ? order : 'popular';
    this.selectors = {
      hearts: '.count',
      views: '.views',
      comments: '.comments',
      title: '.item-title',
    };
    this.url = `https://codepen.io/${this.user}/pens/${this.order}/grid`;
    this.response = [];
    this.index = 1;
    this.flag = false;
  }

  scrape(data) {
    return new Promise((resolve, reject) => {
      const $ = cheerio.load(data);
      if ($('#no-pens-message').html()) {
        reject(new Error('No more pens'));
      }
      const arr = [];
      $('.meta').each((index, meta) => {
        const hearts = this.extract($(meta), 'hearts');
        const views = this.extract($(meta), 'views');
        const comments = this.extract($(meta), 'comments');
        const title = this.extract($(meta), 'title');
        arr.push({
          title,
          hearts,
          views,
          comments,
        });
      });
      arr.forEach(e => this.response.push(e));
      resolve(arr);
    });
  }

  get() {
    const url = `${this.url}/${this.index}`;
    if (this.index === this.max) this.flag = true;
    if (this.flag) return this.response;
    return fetch(url)
      .then(res => res.json())
      .then(data => this.scrape(data.page.html).catch(error))
      .then((chunk) => {
        if (!chunk) this.flag = true;
        this.index += 1;
        return this.get();
      })
      .catch(error);
  }

  extract(meta, what) {
    const selector = this.selectors[what];
    const element = meta
      .find(selector)
      .text();
    if (element) {
      if (selector === this.selectors.title) return element.replace(/\s\s+/g, '');
      const val = element
        .match(/\d+,?\d*,?\d*/)[0]
        .replace(/,/, '')
        .replace(/,/, '');
      return parseInt(val, 10);
    }
    return 0;
  }
}

module.exports = Capi;
