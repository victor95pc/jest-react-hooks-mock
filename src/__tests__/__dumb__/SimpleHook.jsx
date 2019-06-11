import React, { useState } from 'react';

export const DEFAULT_STATE_VALUE = 'hi';

export default function SimpleHook() {
  let [state1] = useState(DEFAULT_STATE_VALUE);

  return <a>{state1}</a>
}