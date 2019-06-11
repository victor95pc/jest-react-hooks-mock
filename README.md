# What its?
Finally a simple solution to access the states and dispatchers inside your react hook components
without the need to change any line in your components, making testing simple and easy to make, just like using Classes. :relaxed:

# Install

```bash
npm install jest-react-hooks-mock --save-dev
```
## Usage

In order to exposed the states inside your component first you import the library:
```js
import setupMockStates from 'jest-react-hooks-mock';
```
To make it works you need to setup one arguments:

| Argument        | Type         | Description                             | Example      |
| ------------: | ------------ | ------------                            | ------------ |
| states  | Array[string] | Here you define the names of all ```useState``` inside your component, **the order here is super important!**   | [ 'state1', 'state2' ] |


### Example
```js
import setupMockStates from 'jest-react-hooks-mock';

let promise = setupMockStates(['test']);
//Make all the component rendering after setup the mock
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

    // states and dispatchers will be avaible when the promise is resolved
    let [states, [setTestState]] = await promise;

    // You can call the dispatchers, it will also trigger the component to rerender
    setTestState('change')

    // here you can read your component states
    expect(states.test).toEqual('change')
  });
});
```