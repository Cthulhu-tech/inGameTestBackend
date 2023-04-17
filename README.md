<p align="start">
 cors не настраивал, из-за этого могут быть проблемы при тестировании со стороны браузер
</p>

<p align="start">
 Проверял все через postman
</p>

<p align="start">
 Примеры запросов представлены на картинке
</p>

<p align="start">
 Постарался реализовать всё что требовалось от тз
</p>

<p align="center">
  /user/refresh - post - проверяет токен сохраненый в cookie (cookie - httpOnly для защиты от XSS атак)
</p>

![Alt text](/image/Screenshot%20from%202023-04-18%2001-14-27.png?raw=true "Optional Title")

<p align="center">
  /text/:id - get - выдает список всех текстов связанных с книгой по id (реализована без связи с таблицей book_entity, хотя так было бы правильнее)
</p>

![Alt text](/image/Screenshot%20from%202023-04-18%2001-13-43.png?raw=true "Optional Title")

<p align="center">
  /text/upload - post - создаем книгу
</p>

![Alt text](/image/Screenshot%20from%202023-04-18%2001-14-09.png?raw=true "Optional Title")

<p align="center">
  /login - post
</p>

![Alt text](/image/Screenshot%20from%202023-04-18%2001-12-38.png?raw=true "Optional Title")

<p align="center">
  /book - post
</p>

![Alt text](/image/Screenshot%20from%202023-04-18%2001-12-44.png?raw=true "Optional Title")

<p align="center">
  /author - post
</p>

![Alt text](/image/Screenshot%20from%202023-04-18%2001-13-15.png?raw=true "Optional Title")

<p align="center">
  /download/:id - post
</p>

![Alt text](/image/Screenshot%20from%202023-04-18%2001-13-30.png?raw=true "Optional Title")

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
