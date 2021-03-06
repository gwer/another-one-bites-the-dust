# another-one-bites-the-dust

Any services status monitor. It will help answer the question "Is everything okay?"

![image](./example.png)

## Features
- Easy configuration
- It's standalone service. You can use it to check resources on a private network
- You can write your own checkers and check whatever you want
- Groups of checks (for different types of checks or different environments for example)
- JavaScript (I'm so sorry)

## It's not for
- Alerts and notifications
- Retrospective

## Built-in checkers
- Simple HTTP status checker
- Dockerflow `__heartbeat__` checker

## How to use
You will need Node.js v12+.

### Simple way
Fork [boilerplate app](https://github.com/gwer/another-one-bites-the-dust-app) or just clone it.

```sh
git clone git@github.com:gwer/another-one-bites-the-dust-app.git
cd another-one-bites-the-dust-app
yarn
yarn start
```

Don't forget to write your own config.

**Note**: cloned repository is `another-one-bites-the-dust`**`-app`**. It is **not recommended** to clone the current repository for direct use.


### From scratch
```sh
yarn add another-one-bites-the-dust
```

```js
// index.js

const server = require('another-one-bites-the-dust');
const config = require('./config');

server(config);
```

```sh
node index.js
```

## Config example
[example_config.js](./example_config.js)

## Built-in checkers options
Only `url` is required.

```js
{
  url,
  expectedHttpCode = 200,
  timeout = 30000,
  warningTimeout = 5000
}
```

## How to write your own checkers
Checker is async function that returns the result in the following format:
```js
Promise<{
  "status": "ok"|"warning"|"error",
  "details"?: string,
}>
```

### Simple checker
```js
const myChecker = () => ({ status: 'ok' });
```

### Checker arguments
Let's imagine you need a strange checker that checks the performance of adding numbers.

```js
const myChecker = (expectedExecutionTime, count) => () => {
  const startTime = performance.now();
  let sum = 0;

  for (let i = 0; i < count; i++) {
    sum += i;
  }

  const endTime = performance.now();

  if ((endTime - startTime) > expectedExecutionTime) {
    return { status: 'warning', details: 'So slow...' };
  }

  return { status: 'ok' };
};
```

```js
const config = {
  ...
  {
    name: 'Strange check',
    checker: myChecker({ expectedExecutionTime: 100, count: 10000 }),
  },
  ...
}
```

## Alternatives

If you need something simpler, try [tinystatus](https://github.com/bderenzo/tinystatus).

If you need something more complicated, with alerts and checks history, try [Gatus](https://github.com/TwiN/gatus).