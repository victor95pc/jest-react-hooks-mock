import React, { useState, Dispatch, Component } from 'react';

interface IComponent extends Component {
  states: { [k: string]: any };
}

interface IOptions {
  component: IComponent;
  states: string[];
}

type Dispatcher = Dispatch<any>;
type Dispatchers = Dispatcher[];
type Callback = (dispatchers: Dispatchers) => void;
type MockImplementation = [any, Dispatcher];

const reactHookStateMock = ({ component, states }: IOptions, callback: Callback): void => {
  const originalUseState = useState;

  let stateIndex = 0;
  let mockedSets: Dispatchers = [];
  let mockedSetsTest: Dispatchers = [];
  let mocksCreated = false;

  component.states = {};

  const createGetterCurrentMockedSets = (_stateIndex: number): ((value: any) => void) => {
    return (value: any): void => {
      mockedSets[_stateIndex](value);
    };
  };

  // @ts-ignore
  const spy = jest.spyOn(React, 'useState').mockImplementation(function(): MockImplementation {
    const [value, set] = originalUseState(arguments[0]);

    const fieldName = states[stateIndex];

    component.states[fieldName] = value;

    const mockedSet: Dispatcher = (newValue): void => {
      component.states[fieldName] = newValue;
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
        callback(mockedSetsTest);
        spy.mockRestore();
        mockedSets = [];
        mockedSetsTest = [];
      }

      mocksCreated = true;
    }

    return [value, mockedSet];
  });
};

export default reactHookStateMock;
