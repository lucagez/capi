<p align="center">
  <img src="gif/capi.gif" width="640" alt="gif of capi.js"/>  
  <br>
  <a href="https://travis-ci.org/lucagez/capi"><img src="https://travis-ci.com/lucagez/capi.svg?branch=master" alt="travis"></a>
  <a href="https://www.npmjs.org/package/capi.js"><img src="https://img.shields.io/npm/v/capi.js.svg?style=flat" alt="npm"></a>
  <img src="https://img.shields.io/badge/license-MIT-f1c40f.svg" alt="MIT">
  <img src="https://img.shields.io/badge/PRs-welcome-6574cd.svg" alt="PR's welcome">
  <img src="https://img.shields.io/badge/gzip%20size-647%20B-44cc11.svg" alt="gzip size">
</p>

# Capi
> The unofficial Codepen.io API


## How it works

- Uses ```node-fetch``` to request data relative to the users.
- Parse the response with ```cheerio```.
- Make use of ```promises``` to fetch pages synchronously.

## Demo

- codepen (with front-end):
    https://codepen.io/lucagez/full/GPNJdE

- glitch (api only):
    server => https://glitch.com/edit/#!/capi
    query => https://capi.glitch.me/api?user={ USERNAME }

## Installation

```sh
npm install --save capi.js
```

## Usage 

```javascript
const Capi = require('capi.js');

(async () => {
    const username = 'lucagez';

    // options:
    const maxPagesToFetch = 5 // if not set, Capi will continue to fetch pens until the very last one
    const order = 'latest' // defaults to 'popular'
    // const user = new Capi(username, maxPagesToFetch, order);
    
    const user = new Capi(username);
    const userData = await user.get();

    console.log(userData)
    // => object
    // [{
    //  title: "pen1", 
    //  views: 2000, 
    //  hearts: 200, 
    //  comments: 20}, 
    //  { other object }, 
    //  ...]
})();
```

## Api

Capi accepts the following parameters:

1. **user**,
username. 
**type:** string. 
**REQUIRED**.

2. **max**,
max pages to fetch before stopping execution. 
**type:** number. 
**NOT-REQUIRED**. if not set, Capi will simply continue to fetch pens until the very last one.

3. **order**,
can be equal to 'popular' or 'latest'. Indicates the order with which the pens are retrieved. 
**type:** string. 
**NOT-REQUIRED**.

## License

Licensed under the MIT license.
