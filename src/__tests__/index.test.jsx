import React from 'react';
import { shallow } from 'enzyme';
import mockStates from '../index';
import SimpleHook, { DEFAULT_PROP_VALUE } from './__dumb__/SimpleHook';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const renderingLib = ({ isEnzyme }) => {
  if (isEnzyme) {
    return shallow(<SimpleHook />)
  }
}
configure({ adapter: new Adapter() });


describe('supports the real world example using', () => {
  describe('enzyme', () => {
    
    it('should change the state using exposed dispatcher', async () => {
      let mockPromise = mockStates(['test']);

      renderingLib({ isEnzyme: true });

      const [states, [setTestState]] = await mockPromise;

      expect(states.test).toEqual(DEFAULT_PROP_VALUE);

      setTestState('change');

      expect(states.test).toEqual('change');
    })

    it('should change the state using exposed dispatcher', async () => {
      let mockPromise = mockStates(['test']);

      renderingLib({ isEnzyme: true });

      const [states, [setTestState]] = await mockPromise;

      expect(states.test).toEqual(DEFAULT_PROP_VALUE);

      setTestState('changez');

      expect(states.test).toEqual('changez');
    })
  })
})