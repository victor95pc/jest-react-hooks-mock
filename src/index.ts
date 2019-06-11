import React, { useState } from 'react';

type StateValues = { [k: string]: any };
type Dispatcher = React.Dispatch<any>;
type Dispatchers = Dispatcher[];
type TPromise = Promise<[StateValues, Dispatchers]>;
type MockImplementation = [any, Dispatcher];

declare const global: { __jestReactHooksMockSpy: jest.SpyInstance };

const reactHookStateMock = (states: string[]): TPromise => {
  if (global.__jestReactHooksMockSpy) {
    global.__jestReactHooksMockSpy.mockRestore();
  }
  
  const originalUseState = useState;

  let stateIndex = 0;
  let mockedSets: Dispatchers = [];
  let mockedSetsTest: Dispatchers = [];
  let mocksCreated = false;
  let stateValues: StateValues = {};

  const createGetterCurrentMockedSets = (_stateIndex: number): ((value: any) => void) => {
    return (value: any): void => {
      mockedSets[_stateIndex](value);
    };
  };

  return new Promise(resolve => {
    global.__jestReactHooksMockSpy = jest.spyOn(React, 'useState').mockImplementation(function (): MockImplementation {
      const [value, set] = originalUseState(arguments[0]);

      const fieldName = states[stateIndex];

      stateValues[fieldName] = value;

      const mockedSet: Dispatcher = (newValue): void => {
        stateValues[fieldName] = newValue;
        set(newValue);
      };

      mockedSets.push(mockedSet);

      if (!mocksCreated) {
        mockedSetsTest.push(createGetterCurrentMockedSets(stateIndex));
      }

      stateIndex += 1;

      if (stateIndex === states.length) {
        stateIndex = 0;

        if (!mocksCreated) {
          resolve([stateValues, mockedSetsTest]);
        }

        mocksCreated = true;
      }

      return [value, mockedSet];
    });
  });
};

export default reactHookStateMock;
