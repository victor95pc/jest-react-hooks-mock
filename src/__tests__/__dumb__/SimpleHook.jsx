import React, { useState } from 'react';

export const DEFAULT_PROP_VALUE = 'hi';

export default function SimpleHook() {
  let [state1, setState1] = useState(DEFAULT_PROP_VALUE);

  return <a>{state1}</a>
}