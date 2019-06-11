import React, { useState } from 'react';

export const DEFAULT_STATE_VALUE_1 = 'his1';
export const DEFAULT_STATE_VALUE_2 = 'his2';

export default function SimpleHook() {
  let [state1] = useState(DEFAULT_STATE_VALUE_1);
  let [state2] = useState(DEFAULT_STATE_VALUE_2);

  return <a>{state1} - {state2}</a>
}