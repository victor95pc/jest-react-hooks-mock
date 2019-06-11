import React from 'react';
import { shallow } from 'enzyme';
import mockStates from '../index';
import SimpleHook, { DEFAULT_STATE_VALUE } from './__dumb__/SimpleHook';
import DualStatesHook from './__dumb__/DualStatesHook';
import { DEFAULT_STATE_VALUE_1, DEFAULT_STATE_VALUE_2 } from './__dumb__/DualStatesHook';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {
  render,
  cleanup,
  act
} from '@testing-library/react'

const renderingLib = ({ isEnzyme, isReactTestingLibrary, Component }) => {
  if (isEnzyme) {
    shallow(<Component />);
  }
  if (isReactTestingLibrary) {
    render(<Component />);
  }
}

describe('supports the real world example using', () => {
  describe('enzyme', () => {
    configure({ adapter: new Adapter() });
    
    it('should change the state using exposed dispatcher', async () => {
      let mockPromise = mockStates(['test']);

      renderingLib({ isEnzyme: true, Component: SimpleHook });

      const [states, [setTestState]] = await mockPromise;

      expect(states.test).toEqual(DEFAULT_STATE_VALUE);

      setTestState('change');
 
      expect(states.test).toEqual('change');

      let mockPromise2 = mockStates(['test2']);

      renderingLib({ isEnzyme: true, Component: SimpleHook });

      const [states2, [setTestState2]] = await mockPromise2;

      expect(states2.test2).toEqual(DEFAULT_STATE_VALUE);

      setTestState2('change');

      expect(states2.test2).toEqual('change');
    });
  });

  describe('react-testing-library', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup)

    it('should change the state using exposed dispatcher', async () => {
      let mockPromise = mockStates(['test']);

      renderingLib({ isReactTestingLibrary: true, Component: SimpleHook });

      const [states, [setTestState]] = await mockPromise;

      expect(states.test).toEqual(DEFAULT_STATE_VALUE);


      act(() => setTestState('change'));

      expect(states.test).toEqual('change');

      let mockPromise2 = mockStates(['test2']);

      renderingLib({ isEnzyme: true, Component: SimpleHook });

      const [states2, [setTestState2]] = await mockPromise2;

      expect(states2.test2).toEqual(DEFAULT_STATE_VALUE);

      act(() => setTestState2('change'));

      expect(states2.test2).toEqual('change');
    });
  });
});



describe('supports the real world example with two useState using', () => {
  describe('enzyme', () => {
    configure({ adapter: new Adapter() });

    it('should change the state using exposed dispatcher', async () => {
      let mockPromise = mockStates(['test1', 'test2']);

      renderingLib({ isEnzyme: true, Component: DualStatesHook });

      const [states, [setTestState1, setTestState2]] = await mockPromise;

      expect(states.test1).toEqual(DEFAULT_STATE_VALUE_1);
      expect(states.test2).toEqual(DEFAULT_STATE_VALUE_2);

      setTestState1('change1');
      setTestState2('change2');

      expect(states.test1).toEqual('change1');
      expect(states.test2).toEqual('change2');
    });
  });

  describe('react-testing-library', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup)

    it('should change the state using exposed dispatcher', async () => {
      let mockPromise = mockStates(['test1', 'test2']);

      renderingLib({ isReactTestingLibrary: true, Component: DualStatesHook });

      const [states, [setTestState1, setTestState2]] = await mockPromise;

      expect(states.test1).toEqual(DEFAULT_STATE_VALUE_1);
      expect(states.test2).toEqual(DEFAULT_STATE_VALUE_2);


      act(() => setTestState1('change1'));
      act(() => setTestState2('change2'));

      expect(states.test1).toEqual('change1');
      expect(states.test2).toEqual('change2');
    });
  });
});