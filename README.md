[![Build Status](https://travis-ci.org/victor95pc/jest-react-hooks-mock.svg?branch=master)](https://travis-ci.org/victor95pc/jest-react-hooks-mock)
[![Coverage Status](https://coveralls.io/repos/github/victor95pc/jest-react-hooks-mock/badge.svg?branch=master)](https://coveralls.io/github/victor95pc/jest-react-hooks-mock?branch=master)
[![DeepScan grade](https://deepscan.io/api/teams/4042/projects/5844/branches/46640/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=4042&pid=5844&bid=46640)
[![License][license-image]][license-url]

[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/make-coverage-badge.svg

# What is it?
Finally a simple solution to access the states and dispatchers inside your react hook components
without the need to change any line in your components, making testing simple and easy, just like using Classes. :relaxed:

# Install

```bash
npm install jest-react-hooks-mock --save-dev
```
## Usage

In order to expose the states inside your component, first you import the library:
```js
import setupMockStates from 'jest-react-hooks-mock';
```
To make it works you need to setup one argument:

| Argument        | Type         | Description                             | Example      |
| ------------: | ------------ | ------------                            | ------------ |
| states  | Array[string] | Here you define the names of all ```useState``` inside your component, **the order here is super important!**   | [ 'state1', 'state2' ] |


### Example
```js
import setupMockStates from 'jest-react-hooks-mock';

let promise = setupMockStates(['test']);
//Make the component render after setting up the mock
//You can only access states and dispatchers after the Promise is resolved
```

## Real World Example

```js
import React from 'react';
import { shallow } from 'enzyme';
import setupMockStates from 'jest-react-hooks-mock';
import YOUR_COMPONENT from '<YOUR_COMPONENT_PATH>';

describe('Test', () => {
  it('run it', async () => {
    // states amount must be the same as the amount of useState you have in your Component
    let promise = setupMockStates(['test']);

    // render components always after setupMockStates 
    shallow(<YOUR_COMPONENT />);

    // states and dispatchers will be available when the promise is resolved
    let [states, [setTestState]] = await promise;

    // You can call the dispatchers, it will also trigger the component to rerender
    setTestState('change')

    // here you can read your component states
    expect(states.test).toEqual('change')
  });
});
```
