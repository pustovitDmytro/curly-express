# curly-express
**curly-express** print all received requests as curls.

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Total alerts][lgtm-alerts-badge]][lgtm-alerts-url]
[![Language grade][lgtm-lg-badge]][lgtm-lg-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Vulnerabilities][badge-vuln]](https://snyk.io/)
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![License][badge-lic]][github]

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Requirements
[![Platform Status][appveyor-badge]][appveyor-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][appveyor-url] on darwin, linux, win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

To install the library run the following command

```bash
  npm i --save curly-express
```

## Usage

This package can be used as middleware. Note that it must be placed after [body-parser](https://www.npmjs.com/package/body-parser) in order to receive the request body.

### Default configuration

In the default configuration, the middleware will print cURL to stdout:

```javascript
import curl             from 'curly-express';
import express          from 'express';

const app = express();

app.use(bodyParser.json());
app.use(curl);
app.use(router);
```

### Advanced usage

You can customize some stuff by importing the factory method:

#### Customize logger
 
You can pass your own logger as an optional parameter:

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

it will add curl to ```_curl``` property of the request object. If you want to change the property key, use:

```javascript
const curl =  cURL({
    attach : '_curl_custom_key'
})
```

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/curly-express
[github]: https://github.com/pustovitDmytro/curly-express
[coveralls]: https://coveralls.io/github/pustovitDmytro/curly-express?branch=master
[badge-deps]: https://img.shields.io/david/pustovitDmytro/curly-express.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/curly-express.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/curly-express.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/curly-express.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/curly-express/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/curly-express?branch=master

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/curly-express
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/curly-express

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/curly-express/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/curly-express

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/curly-express

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/curly-express/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/curly-express/?branch=master

[lgtm-lg-badge]: https://img.shields.io/lgtm/grade/javascript/g/pustovitDmytro/curly-express.svg?logo=lgtm&logoWidth=18
[lgtm-lg-url]: https://lgtm.com/projects/g/pustovitDmytro/curly-express/context:javascript

[lgtm-alerts-badge]: https://img.shields.io/lgtm/alerts/g/pustovitDmytro/curly-express.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/pustovitDmytro/curly-express/alerts/

[codacy-badge]: https://app.codacy.com/project/badge/Grade/389f7d625cac48a7b487510eead3ba16
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/curly-express/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/curly-express&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_curly-express&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_curly-express

[npm-downloads-badge]: https://img.shields.io/npm/dw/curly-express
[npm-size-badge]: https://img.shields.io/bundlephobia/min/curly-express
[npm-size-url]: https://bundlephobia.com/result?p=curly-express

[appveyor-badge]: https://ci.appveyor.com/api/projects/status/3sbmgut9rl4xmt59/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/pustovitDmytro/curly-express/branch/master


