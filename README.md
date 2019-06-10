# What its?
Finally a simple solution to access the states and dispatchers inside your react hook components
without the need to change any line in your components. :relaxed:

# Install

```bash
npm install jest-react-hooks-mock --save-dev
```
## Usage

In order to exposed the states inside your component first you import the library:
```js
import mockStates from 'jest-react-hooks-mock';
```
To make it works you need to setup two options and the last argument will be a callback:

| Option        | Type         | Description                             | Example      |
| ------------: | ------------ | ------------                            | ------------ |
| component     | Function     | Need to be a valid react hook function  | YourComponent |
| states  | Array[string] | Here you define the names of all ```useState``` inside your component, **the order here is super important!**   | [ 'state1', 'state2' ] |

### Example
```js
import mockStates from 'jest-react-hooks-mock';

mockStates({ component: YOUR_COMPONENT, states: ['test'] }, ([setTestState]) => {
  //Make all the component rendering inside the callback
  //Inside the callback you can access your states by using YOUR_COMPONENT.states.
}
```

## Real World Example

```js
import React from 'react';
import { shallow } from 'enzyme';
import mockStates from 'jest-react-hooks-mock';
import YOUR_COMPONENT from '<YOUR_COMPONENT_PATH>';

describe('Test', () => {
  it('run it', () => {
    // states amount must be the same as the amount of useState you have in your Component
    mockStates({ component: YOUR_COMPONENT, states: ['test'] }, ([setTestState]) => {
      // render components always inside the callback!
      shallow(<YOUR_COMPONENT />)

      // You can call the dispatchers in the callback, it will also trigger the component to rerender
      setTestState('change')

      // states are saved in the "states" field on your Component, so now you read them
      expect(YOUR_COMPONENT.states.test).toEqual('change')
    });
  });
});
```