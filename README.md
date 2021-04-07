# curly-express
**curly-express** print all received requests as curl's.

[![Version][badge-vers]][npm]
[![Dependencies][badge-deps]][npm]
[![Vulnerabilities][badge-vuln]](https://snyk.io/)
[![Build Status][badge-tests]][travis]
[![Coverage Status][badge-coverage]](https://coveralls.io/github/pustovitDmytro/curly-express?branch=master)
[![License][badge-lic]][github]

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Requirements
To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `6.0+`
* npm `3.0+`

## Installation

To install the library run following command

```bash
  npm i --save curly-express
```

## Usage

This package can be used as middleware. Note that it must be placed after [body-parser](https://www.npmjs.com/package/body-parser) in order to receive request body.

### Default configuration

In default configuration middleware will print cURL to stdout:

```javascript
import curl             from 'curly-express';
import express          from 'express';

const app = express();

app.use(bodyParser.json());
app.use(curl);
app.use(router);
```

### Advanced usage

You can customize some stuff by importing factory method:

#### Customize logger
 
You can pass own logger as optional parameter:

```javascript
import { cURL }  from 'curly-express';

const curl =  cURL({
    log : console.log
})

app.use(curl);
```

#### Attach to request

If you need curl in further middlewares, you can do it with optional argument ```attach```:

```javascript
import { cURL }  from 'curly-express';

const curl =  cURL({
    attach : true
})

app.use(curl); // check req._curl
```

it will add curl to ```_curl``` property of request object, if you want to change property key, use:

```javascript
const curl =  cURL({
    attach : '_curl_custom_key'
})
```

## Contribute

Make the changes to the code and tests and then commit to your branch. Be sure to follow the commit message conventions.

Commit message summaries must follow this basic format:
```
  Tag: Message (fixes #1234)
```

The Tag is one of the following:
* **Fix** - for a bug fix.
* **Update** - for a backwards-compatible enhancement.
* **Breaking** - for a backwards-incompatible enhancement.
* **Docs** - changes to documentation only.
* **New** - implemented a new feature.
* **Upgrade** - for a dependency upgrade.
* **Chore** - for tests, refactor, style, etc.

The message summary should be a one-sentence description of the change. The issue number should be mentioned at the end.


[npm]: https://www.npmjs.com/package/curly-express
[github]: https://github.com/pustovitDmytro/curly-express
[travis]: https://travis-ci.org/pustovitDmytro/curly-express
[coveralls]: https://coveralls.io/github/pustovitDmytro/curly-express?branch=master
[badge-deps]: https://img.shields.io/david/pustovitDmytro/curly-express.svg
[badge-tests]: https://img.shields.io/travis/pustovitDmytro/curly-express.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/curly-express.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/curly-express.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/curly-express.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/curly-express/badge.svg?branch=master